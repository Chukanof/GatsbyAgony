/* ex.
createPages - https://next.gatsbyjs.org/docs/node-apis/#createPages 
Tell plugins to add pages. This extension point is called only after
the initial sourcing and transformation of nodes plus creation of the
GraphQL schema are complete so you can query your data in order to create pages.
*/
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
          component: path.resolve(`./src/templates/post.js`),
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

/*
createPagesStatefully - https://next.gatsbyjs.org/docs/node-apis/#createPagesStatefully
Like createPages but for plugins who want to manage creating
and removing pages themselves in response to changes in data not managed by Gatsby. 
Plugins implementing createPages will get called regularly to recompute page information 
as G atsby’s data changes but those implementing createPagesStatefully will not.
*/
exports.createPagesStatefully = function() {
  //   console.log(arguments);
};

/*
generateSideEffects - https://next.gatsbyjs.org/docs/node-apis/#generateSideEffects
Tell plugins with expensive “side effects” from queries to start running those now. This is a soon-to-be-replaced API only currently in use by gatsby-plugin-sharp.
*/
exports.generateSideEffects = function() {
  //   console.log(arguments);
};

/*
onCreateBabelConfig - https://next.gatsbyjs.org/docs/node-apis/#onCreateBabelConfig
Let plugins extend/mutate the site’s Babel configuration. This API will change before 2.0 as it needs still to be converted to use Redux actions.
*/
exports.onCreateBabelConfig = function() {
  console.log(arguments);
};

/*
onCreateNode - https://next.gatsbyjs.org/docs/node-apis/#onCreateNode
Called when a new node is created. Plugins wishing to extend or transform nodes created by other plugins should implement this API.
*/
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: "" });
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
/* ex.
onCreatePage - https://next.gatsbyjs.org/docs/node-apis/#onCreatePage
Called when a new page is created. This extension API is useful for programmatically
 manipulating pages created by other plugins e.g. if you want paths without trailing 
 slashes.
*/
exports.onCreatePage = function() {};

/* ex.
onCreateWebpackConfig - https://next.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
Let plugins extend/mutate the site’s webpack configuration.
 */
exports.onCreateWebpackConfig = function() {};

/*
onPostBootstrap - https://next.gatsbyjs.org/docs/node-apis/#onPostBootstrap
Called at the end of the bootstrap process after all other extension APIs have been called. 
*/
exports.onPostBootstrap = function() {};

/*
onPostBuild - https://next.gatsbyjs.org/docs/node-apis/#onPostBuild
The last extension point called after all other parts of the build process are complete.
*/
exports.onPostBuild = function() {};

/*
onPreBootstrap - https://next.gatsbyjs.org/docs/node-apis/#onPreBootstrap
Called once Gatsby has initialized itself and is ready to bootstrap your site.
*/
exports.onPreBootstrap = function() {};

/*
onPreBuild - https://next.gatsbyjs.org/docs/node-apis/#onPreBuild
The first extension point called during the build process. Called after the bootstrap has completed but before the build steps start.
*/
exports.onPreBuild = function() {};

/*
onPreExtractQueries - https://next.gatsbyjs.org/docs/node-apis/#onPreExtractQueries
Run before GraphQL queries/fragments are extracted from JavaScript files. Useful for plugins to add more JavaScript files with queries/fragments e.g. from node_modules.
*/
exports.onPreExtractQueries = function() {};

/*
onPreInit - https://next.gatsbyjs.org/docs/node-apis/#onPreInit
The first API called during Gatsby execution, runs as soon as plugins are loaded, before cache initialization and bootstrap preparation.
*/
exports.onPreInit = function() {};

/*
preprocessSource - https://next.gatsbyjs.org/docs/node-apis/#preprocessSource
Ask compile-to-js plugins to process source to JavaScript so the query runner can extract out GraphQL queries for running.
*/
exports.preprocessSource = function() {};

/*
resolvableExtensions - https://next.gatsbyjs.org/docs/node-apis/#resolvableExtensions
Lets plugins implementing support for other compile-to-js add to the list of “resolvable” file extensions. Gatsby supports .js and .jsx by default.
*/
exports.resolvableExtensions = function() {};

/* ex.
setFieldsOnGraphQLNodeType - https://next.gatsbyjs.org/docs/node-apis/#setFieldsOnGraphQLNodeType
Called during the creation of the GraphQL schema. Allows plugins to add new fields to the types created from data nodes. It will be called separately for each type.
*/
exports.setFieldsOnGraphQLNodeType = function() {};

/* ex.
sourceNodes - https://next.gatsbyjs.org/docs/node-apis/#sourceNodes
Extension point to tell plugins to source nodes.
*/
exports.sourceNodes = function() {};
