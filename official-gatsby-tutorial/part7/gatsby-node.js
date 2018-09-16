const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.onCreateNode = ({ node, getNode }) => {
//   if (node.internal.type === `MarkdownRemark`) {
//     // получаем родительскую ноду md файла, чтобы получить его название
//     const fileNode = getNode(node.parent);
//     console.log(`\n`, fileNode.relativePath);

//     // функция createFilePath инкапсулирует поиск родительской ноды и создание slug-строки
//     console.log(
//       `slug string: ${createFilePath({ node, getNode, basePath: `pages` })}`
//     );
//   }
// };
// этап onPreBootstrap
// добавляем slug-строку в MarkdownRemark ноду, чтобы потом можно было ее вытянуть через GraphQL
// для этого воспользуемся createNodeField
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    console.log(`slug string: ${slug}`);

    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
    console.log(`node value->`);
    console.log(node.fields);
  }
};

// этап - building shema
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
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
    `).then(result => {
      console.log(JSON.stringify(result, null, 2));
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug
          }
        });
      });
      resolve();
    });
  });
};
