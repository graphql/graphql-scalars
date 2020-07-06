exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions

    const blogPostTemplate = require.resolve(`./src/templates/specTemplate.js`)
    const overviewTemplate = require.resolve(`./src/templates/overviewTemplate.js`)

    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___name,frontmatter___version,frontmatter___build] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                name
                version
                author
                build
              }
            }
          }
        }
      }
    `)

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    const mainPathToBuild = {};
    const specs = [];
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const mainPath = node.frontmatter.author + '/' + node.frontmatter.name + '/' + node.frontmatter.version;
        const fullPath = mainPath + '.' + node.frontmatter.build;
        if (!mainPathToBuild[mainPath]) {
            mainPathToBuild[mainPath] = [];
        }
        mainPathToBuild[mainPath].push({ fullPath, frontmatter: node.frontmatter });
        specs.push({
            path: '/' + fullPath,
            name: node.frontmatter.author + ' ' + node.frontmatter.name + ' ' + node.frontmatter.version + ' (build ' + node.frontmatter.build + ')'
        })
    });
    Object.keys(mainPathToBuild).forEach(key => {
        const builds = mainPathToBuild[key];
        for (let i = 0; i < builds.length; i++) {
            const isCurrentVersion = i == builds.length - 1;
            const { fullPath, frontmatter } = builds[i];
            createPage({
                path: fullPath,
                component: blogPostTemplate,
                context: {
                    isCurrentVersion,
                    author: frontmatter.author,
                    version: frontmatter.version,
                    name: frontmatter.name
                },
            })
        }
    });
    createPage({
        path: '/overview',
        component: overviewTemplate,
        context: {
            specs
        }
    });
}
