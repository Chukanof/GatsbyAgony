- Создание новой страницы состоит из двух этапов:
  1. Генерация пути для страницы (Generate the “path” or “slug” for the page.)
    - slug - описательная часть url-адреса - несколько слов в составе url-адреса, кратко описывающих контент страницы 
  2. Создание страницы
- Для программного создания страниц из md файлов необходимо научиться использовать два Gatsby API `onCreateNode` и `createPages`. Эти АПИ являются наиболее используемыми при разработке сайтов и плагинов. (To create your markdown pages, you’ll learn to use two Gatsby APIs onCreateNode and createPages. These are two workhorse APIs you’ll see used in many sites and plugins.)
- Для реализации АПИ необходимо экспортировать функцию с именем АПИ из `gatsby-node.js` ( To implement an API, you export a function with the name of the API from gatsby-node.js. )

- `onCreateNode` вызывается каждый раз после того как Gatsby создает новую ноду или обновляет ее (This onCreateNode function will be called by Gatsby whenever a new node is created (or updated).)
- `createNodeField` - позволяет создать дополнительные поля в ноде созданной любым другим плагином.
  - Только создатель ноды можно модифицировать её напрямую. Все остальные плагины (включая `gatsby-node.js`) должны использовать функцию `createNodeField` для создания дополнительных полей в ноде. (Only the original creator of a node can directly modify the node—all other plugins (including your gatsby-node.js) must use this function to create additional fields.)
  - получить добаленные поля к ноде можно:
    - в js через обращение к `node.fields`
    - через GraphQL: 
    ```
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
    ```

Creating Pages

- Программное создание страниц в Gatsby состоит из двух этапов:
  - Получить данные через GraphQL
  - Замапить данные на страницу

  