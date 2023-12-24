#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate chrono;

use chrono::{Utc, DateTime};
use tauri::{Window};
use rust_search::{FilterExt, SearchBuilder};
use std::fs;
use regex::Regex;

#[derive(Clone, serde::Serialize)]
struct Search {
    file_path: String,
    repetitions_count: usize,
    indexes: Vec<usize>
}

#[derive(Clone, serde::Serialize)]
struct Error{
    path: String
}

#[derive(Clone, serde::Serialize)]
struct SearchResult {
    result: Option<Vec<Search>>,
    error: Option<Vec<Error>>
}

struct SearchConfig {
    path: String,
    text: String,
    names: Option<Vec<String>>,
    extensions: Option<Vec<String>>,
    is_recursion: bool,
    date_modification: Option<String>,
    is_search: bool
}



static mut SEARCH_CONFIG: SearchConfig = SearchConfig {
    path: String::new(),
    text: String::new(),
    names: None,
    extensions: None,
    is_recursion: false,
    date_modification: None,
    is_search: true
};

pub struct SearchWizard {}

impl SearchWizard {
    /// Получение файлов с использованием рекурсии
    async fn get_files_by_recursion(path: &String) -> Vec<String> {
        SearchBuilder::default()
            .location(path)
            .dirs(false)
            .custom_filter(|dir| {
                if dir.metadata().unwrap().is_file() == false {
                    return  false;
                }
                // Проверка на расширения файла
                if let Some(extensions) = unsafe {&SEARCH_CONFIG.extensions} {
                    if let Some(extension) = dir.path().extension() {
                        if extensions.contains(&extension.to_string_lossy().to_string()) == false {
                            return  false;
                        }
                    }
                }

                // Проверка на имя файла
                if let Some(names) = unsafe {&SEARCH_CONFIG.names} {
                    let re = Regex::new(r"\..+").unwrap();
                    let name: String = re.replace(&dir.file_name().to_string_lossy().to_string(), "").into();
                    
                    if names.contains(&name) == false {
                        return false
                    }
                }

                // Дата модификации
                if let Some(date_modification) = unsafe {SEARCH_CONFIG.date_modification.clone()}{
                    let file_modified_string = DateTime::<Utc>::from(dir.metadata().unwrap().modified().unwrap()).format("%d-%m-%Y").to_string();
                    if file_modified_string != date_modification {
                        return false;
                    }
                }
                return true;
            })
            .build()
            .collect()
    }

    /// Получение файлов с глубиной вхождения 1
    async fn get_files( path: &String) -> Vec<String> {
        SearchBuilder::default()
            .location(path)
            .dirs(false)
            .custom_filter(|dir| {
                if dir.metadata().unwrap().is_file() == false {
                    return  false;
                }
                // Проверка на расширения файла
                if let Some(extensions) = unsafe {&SEARCH_CONFIG.extensions} {
                    if let Some(extension) = dir.path().extension() {
                        if extensions.contains(&extension.to_string_lossy().to_string()) == false {
                            return  false;
                        }
                    }
                }

                // Проверка на имя файла
                if let Some(names) = unsafe {&SEARCH_CONFIG.names} {
                    let re = Regex::new(r"\..+").unwrap();
                    let name: String = re.replace(&dir.file_name().to_string_lossy().to_string(), "").into();
                    
                    if names.contains(&name) == false {
                        return false
                    }
                }

                // Дата модификации
                if let Some(date_modification) = unsafe {SEARCH_CONFIG.date_modification.clone()}{
                    let file_modified_string = DateTime::<Utc>::from(dir.metadata().unwrap().modified().unwrap()).format("%d-%m-%Y").to_string();
                    if file_modified_string != date_modification {
                        return false;
                    }
                }
                return true;
            })
            .depth(1)
            .build()
            .collect()
    }

    
    /// Поиск текста в файле
    async fn search( files: &Vec<String>, text: &String) -> SearchResult{
        let mut result:Vec<Search> = Vec::new();
        let mut error:Vec<Error> = Vec::new();
        
        for file in files {
            unsafe {
                if SEARCH_CONFIG.is_search == false {
                    break;
                }
            }

            let mut indexes:Vec<usize> = Vec::new();
            let file_content = fs::read_to_string(file);
            let content: Option<String> = match file_content {
                Ok(content) => Some(content),
                Err(_) => {
                    error.push(Error{path: file.clone()});
                    continue;
                }
            };
            if let Some(content) = content {
                for number in content.to_lowercase().match_indices(text).map(|(i, _)|i) {
                    indexes.push(number);
                }
                
                if indexes.len() > 0 {
                    result.push(Search {
                        file_path:file.clone(), 
                        repetitions_count: indexes.len(),
                        indexes: indexes.clone()
                    });
                }
            } 
        }

        return SearchResult {
            result: Some(result),
            error: Some(error)
        }
    }

    /// Запуск поиска
    pub async fn run(window: &Window) {
        let path: String;
        let text: String;
        let is_recursion: bool;

        unsafe {
            path = SEARCH_CONFIG.path.clone();
            text = SEARCH_CONFIG.text.clone();
            is_recursion = SEARCH_CONFIG.is_recursion.clone();
        }

        let files;
        if is_recursion {
            files = SearchWizard::get_files_by_recursion(&path).await;
        } else {
            files = SearchWizard::get_files(&path).await;
        }


        window.emit("COUNT_FILE_FOUND", files.len()).unwrap();
        
        if files.len() > 0 {
            let result = SearchWizard::search(&files, &text).await;
            window.emit("SEARCH_RESULT", result).unwrap();
        } 
    }


}

#[tauri::command]
async fn search_files(window: Window, path: String, text: String, names: Option<Vec<String>>, extensions: Option<Vec<String>>, is_recursion: bool, modified_date: Option<String>){
    unsafe {
        SEARCH_CONFIG.path = path;
        SEARCH_CONFIG.text = text;
        SEARCH_CONFIG.names = names;
        SEARCH_CONFIG.extensions = extensions;
        SEARCH_CONFIG.is_recursion = is_recursion;
        SEARCH_CONFIG.date_modification = modified_date;
        SEARCH_CONFIG.is_search = true;
    }
    SearchWizard::run(&window).await;

}

#[tauri::command]
async fn stop_search(){
    unsafe {
        SEARCH_CONFIG.is_search = false;
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![search_files, stop_search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}