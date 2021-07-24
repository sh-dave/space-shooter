let prj = new Project('Space');

console.log(`Building for target: ${platform}`);

prj.addDefine('analyzer_optimize');
prj.addParameter('-dce full');
prj.addParameter('--times');
prj.addDefine('macro-times');
prj.addDefine('dump=pretty');

prj.addAssets('assets');
prj.addSources('src');

resolve(prj);
