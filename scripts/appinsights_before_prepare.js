/*
Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved.
Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.
*/

/*
    To comply with the Apache 2.0 Licence:
    This file been modified by Actemium Schweiz AG after being forked from its original repo.
*/

/*jshint node: true*/

module.exports = function (ctx) {

    const { ConfigParser } = require('cordova-common');
    var path = require('path');
    var shell = require('shelljs');

    var pluginConfigFile = path.resolve(ctx.opts.plugin.dir, 'www', 'AppInsights.js');
    var projectConfigXml = new ConfigParser(path.join(ctx.opts.projectRoot, 'config.xml'));
    var instrKey = projectConfigXml.getGlobalPreference('instrumentation_key');

    if (instrKey) {
        // replace instrumentation key stub with provided value
        console.log("cordova-plugin-ms-appinsights - Replacing 'instrumentationKey' parameter in plugin");
        shell.sed('-i',
            /instrumentationKey:\s"(.*?)"/g,
            'instrumentationKey: "' + instrKey + '"',
            pluginConfigFile);
    }
    else
    {
        console.log("cordova-plugin-ms-appinsights - /!\\ instrumentation_key not provided in config.xml /!\\");
    }
};
