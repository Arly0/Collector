# Gulp сборщик от Arly0
***
## Структура файлов для разработки
**src**
* fonts - шрифты
* images - изображения
* js - скрипты
* libs - все библиотеки (рекомендуется для каждой создавать отдельную папку)
* sass -
    * reset.sass - обнуление всех браузерных стилей
    * fonts.sass - подключение всех шрифтов в ваш проект
    * utilities.sass - создание переменных и миксинов
    * project.sass - ваши стили при разработке 
    * main.sass - файл стилей, объеденяющих все стили
***
## Подключение файлов
**gulpfile.js**
* инициализация 
    При создании нового проекта проинициализировать все пакеты - в самом вверху команды в комментариях.
* css
    Все стили находятся в одном файле, стили библиотек во втором. На страницу(ы) необходимо подключить всего 2 файла - *style.css* и *libs.min.css*.

* js
    Все скрипты проходят через минификацию. Объеденения в один файл не происходит по причине иногда возникающих конфликтов. Все файлы нужно подклбчать на страницу и добавлять суфикс *min* (example: *script.js* -> *script.min.js*). JS библиотеки сжимаются в одном файле. Подключать - *libs.min.js*.

***
## Дополнительно
Все изображения проходят минификацию.
Для стандартного запуска сборщика использовать:
* без сервера - ***gulp default***
* с сервером - ***gulp server-defalut*** 
