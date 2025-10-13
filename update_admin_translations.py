#!/usr/bin/env python3
import json
import os

# Define the missing admin translation keys
admin_nav_keys = {
    "adminPanel": {
        "de": "Admin-Panel",
        "it": "Pannello Amministratore",
        "pt": "Painel de Administração",
        "ja": "管理パネル",
        "ko": "관리자 패널",
        "ar": "لوحة الإدارة",
        "ru": "Административная панель",
        "hi": "प्रशासक पैनल"
    },
    "admin": {
        "de": "Administrator",
        "it": "Amministratore",
        "pt": "Administrador",
        "ja": "管理者",
        "ko": "관리자",
        "ar": "مشرف",
        "ru": "Администратор",
        "hi": "प्रशासक"
    }
}

admin_login_keys = {
    "loggingIn": {
        "de": "Anmeldung...",
        "it": "Accesso in corso...",
        "pt": "Fazendo login...",
        "ja": "ログイン中...",
        "ko": "로그인 중...",
        "ar": "جارٍ تسجيل الدخول...",
        "ru": "Выполняется вход...",
        "hi": "लॉग इन हो रहे हैं..."
    },
    "loginFailed": {
        "de": "Anmeldung fehlgeschlagen. Bitte versuchen Sie es später erneut oder laden Sie die Seite neu",
        "it": "Accesso fallito. Riprova più tardi o ricarica la pagina",
        "pt": "Falha no login. Tente novamente mais tarde ou recarregue a página",
        "ja": "ログインに失敗しました。後でもう一度試すか、ページを再読み込みしてください",
        "ko": "로그인에 실패했습니다. 나중에 다시 시도하거나 페이지를 새로고침하세요",
        "ar": "فشل تسجيل الدخول. حاول مرة أخرى لاحقاً أو أعد تحميل الصفحة",
        "ru": "Ошибка входа. Попробуйте позже или перезагрузите страницу",
        "hi": "लॉगिन विफल। बाद में पुनः प्रयास करें या पृष्ठ को पुनः लोड करें"
    },
    "fillAllFields": {
        "de": "Bitte füllen Sie alle Felder aus",
        "it": "Si prega di compilare tutti i campi",
        "pt": "Por favor, preencha todos os campos",
        "ja": "すべてのフィールドを入力してください",
        "ko": "모든 필드를 입력해주세요",
        "ar": "يرجى ملء جميع الحقول",
        "ru": "Пожалуйста, заполните все поля",
        "hi": "कृपया सभी फ़ील्ड भरें"
    }
}

def update_language_file(lang_code):
    file_path = f"src/i18n/locales/{lang_code}.json"
    
    if not os.path.exists(file_path):
        print(f"Warning: {file_path} does not exist")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update admin nav keys
    if "admin" not in data:
        data["admin"] = {}
    if "nav" not in data["admin"]:
        data["admin"]["nav"] = {}
    
    for key, translations in admin_nav_keys.items():
        if lang_code in translations:
            data["admin"]["nav"][key] = translations[lang_code]
    
    # Update admin login keys
    if "login" not in data["admin"]:
        data["admin"]["login"] = {}
    
    for key, translations in admin_login_keys.items():
        if lang_code in translations:
            data["admin"]["login"][key] = translations[lang_code]
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {lang_code}.json with admin translations")

# Update all language files except English, Spanish, French, and Chinese (already updated)
languages_to_update = ["de", "it", "pt", "ja", "ko", "ar", "ru", "hi"]

for lang in languages_to_update:
    update_language_file(lang)

print("All admin translations updated successfully!")