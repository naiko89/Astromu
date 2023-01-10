const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

//Encore
// directory where compiled assets will be stored
///.setOutputPath('public/build/app_build/')
// public path used by the web server to access the output path
///.setPublicPath('/build/app_build')
// only needed for CDN's or sub-directory deploy
//.setManifestKeyPrefix('build/')

/*
 * ENTRY CONFIG
 *
 * Each entry will result in one JavaScript file (e.g. app.js)
 * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
 */
///.addEntry('app', './assets/app.js')

// enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
///.enableStimulusBridge('./assets/controllers.json')

// When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
///.splitEntryChunks()

// will require an extra script tag for runtime.js
// but, you probably want this, unless you're building a single-page app
///.enableSingleRuntimeChunk()

/*
 * FEATURE CONFIG
 *
 * Enable & configure other features below. For a full
 * list of features, see:
 * https://symfony.com/doc/current/frontend.html#adding-more-features
 */
///.cleanupOutputBeforeBuild()
///.enableBuildNotifications()
///.enableSourceMaps(!Encore.isProduction())
// enables hashed filenames (e.g. app.abc123.css)
///.enableVersioning(Encore.isProduction())

///.configureBabel((config) => {
///    config.plugins.push('@babel/plugin-proposal-class-properties');
///})

// enables @babel/preset-env polyfills
///.configureBabelPresetEnv((config) => {
///    config.useBuiltIns = 'usage';
///    config.corejs = 3;
///})

// enables Sass/SCSS support
//.enableSassLoader()

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment if you use React
///.enableReactPreset()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()
///;




Encore.setOutputPath('public/build/app_build/').setPublicPath('/build/app_build')
    /*
     * ENTRY CONFIG
     */
    .addEntry('app', './assets/app.js')
    .enableStimulusBridge('./assets/controllers.json')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    /*
     * FEATURE CONFIG
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .enableReactPreset()
;


const appConfig = Encore.getWebpackConfig()
appConfig.name = 'appConfig'


Encore.setOutputPath('public/build/login_build/').setPublicPath('/build/login_build')
    /*
     * ENTRY CONFIG
     */
    .addEntry('login', './assets/index.js')
    //.enableStimulusBridge('./assets/controllers.json')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    /*
     * FEATURE CONFIG
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .enableReactPreset()
;


const loginConfig = Encore.getWebpackConfig();
loginConfig.name = 'loginConfig';

// da qui in poi devi creare l' entry point per il lato pubblico, spostare poi l' entrypoint app all' interno del index dopo il login bella li :D

module.exports = [appConfig, loginConfig];
