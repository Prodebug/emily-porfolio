# Музыкальное портфолио Эмили

Сайт, куда Эмили может **сама загружать свои песни** прямо с телефона или компьютера (без знания кода).

Работает на **GitHub Pages** + бесплатный **Firebase**.

---

## Что умеет Эмили

1. Заходит на сайт → нажимает «Админ»
2. Вводит email + пароль (которые ты ей дашь)
3. Выбирает файл песни + пишет название
4. Нажимает «Загрузить» — песня сразу появляется на сайте
5. Может удалять песни одной кнопкой

Всё с телефона, без компьютера и без GitHub.

---

## Что нужно сделать тебе (один раз)

### 1. Создай проект Firebase (бесплатно)

1. Зайди на https://console.firebase.google.com
2. Нажми «Добавить проект» → назови как хочешь (например `emily-music`)
3. Отключи Google Analytics (не нужно)
4. Создай проект

### 2. Добавь веб-приложение

1. На главной проекта нажми иконку **Web** (`</>`)
2. Зарегистрируй приложение (любое имя)
3. Скопируй объект `firebaseConfig` (там apiKey, projectId и т.д.)

### 3. Вставь конфиг в код

Открой файл `static/js/firebase-config.js` и замени значения:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "твой-проект.firebaseapp.com",
  projectId: "твой-проект",
  storageBucket: "твой-проект.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### 4. Включи Authentication

1. В Firebase → **Build → Authentication → Get started**
2. Вкладка **Sign-in method** → **Email/Password** → Enable → Save
3. Вкладка **Users** → **Add user**
   - Email: любой (например `emily@mail.ru`)
   - Пароль: придумай простой (например `Emily2026!`)
4. Этот email + пароль отдашь сестре

### 5. Включи Firestore

1. **Build → Firestore Database → Create database**
2. Выбери **Start in test mode** (потом поменяем правила)
3. Локация — ближайшая (europe-west)

### 6. Правила Firestore (важно!)

Зайди в **Firestore → Rules** и поставь:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /songs/{songId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Нажми **Publish**.

### 7. Включи Storage

1. **Build → Storage → Get started**
2. Начни в test mode
3. Потом **Rules** поставь:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /songs/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Publish.

### 8. Залей сайт на GitHub

1. Создай репозиторий на GitHub
2. Залей все файлы из этой папки
3. Settings → Pages → Source: Deploy from branch → main / root
4. Через минуту сайт будет по адресу `https://твой-ник.github.io/имя-репо`

---

## Готово!

Теперь Эмили просто:

- Открывает сайт
- Жмёт «Админ»
- Вводит email + пароль
- Загружает песни

Никаких файлов, кода и компьютера ей не нужно.

---

## Если что-то не работает

- Открой консоль браузера (F12) — там будут ошибки
- Проверь, что в `firebase-config.js` правильные ключи
- Проверь Rules в Firestore и Storage
- Убедись, что пользователь создан в Authentication
