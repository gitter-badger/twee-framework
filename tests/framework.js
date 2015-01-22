var assert = require("assert")
    , exec = require('child_process').exec
    , fs = require('fs')
    , cwd = process.cwd()
    , appName = 'mochatweetestapp'
    , tweeBaseDir = '/var/tmp/' + appName;

var twee = require('../');

describe('Twee Application Generator', function(){


    it('should instantiate Twee Instance', function(){
        assert(typeof twee, 'object');
    });

    it('should inherit from event emitter', function(done){
        twee.on('foo', done);
        twee.emit('foo');
    });

    it('should normally generate application', function(done){
        this.timeout(60000);
        process.chdir('/var/tmp/');
        exec('rm -rf ' + tweeBaseDir, function(error, stdout, stderr){
            exec('npm install -g twee && twee -a ' + appName, function(error, stdout, stderr){
                exec('cd ' + tweeBaseDir + ' && npm install', function(error, stdout, stderr){
                    done(error);
                });
            });
        });
    });

    it('should normally bootstrap', function(){
        process.chdir(tweeBaseDir);
        exec('NODE_ENV=' + tweeBaseDir + '/node_modules', function(error, stdout, stderr){
            twee.setBaseDirectory(tweeBaseDir);
            twee.Bootstrap();
        });
        //fs.writeFileSync(cwd + '/tests/fixtures/framework.json', JSON.stringify(twee.__config, null, '\t'));
    });
});

describe('Twee Configs', function(){
    it('core configs presents', function(){
        assert(typeof twee.__config['twee'], 'object');
        assert(typeof twee.__config['twee']['extensions'], 'object');
        assert(typeof twee.__config['twee']['options'], 'object');
        assert(typeof twee.__config['twee']['package'], 'object');
        assert(typeof twee.__config['__moduleOptions__'], 'object');
        assert(typeof twee.__config['__moduleOptions__']['Default'], 'object');
        assert(typeof twee.__config['__folders__'], 'object');
        assert(typeof twee.__config['__folders__']['Default'], 'object');
        assert(typeof twee.__config['__setup__'], 'object');
        assert(typeof twee.__config['__setup__']['Default'], 'object');
        assert(typeof twee.__config['default'], 'object');
    });

    it('__moduleOptions__ configs presents', function(){
        assert(typeof twee.__config['__moduleOptions__'], 'object');
        assert(typeof twee.__config['__moduleOptions__']['Default'], 'object');
    });

    it('__folders__ configs presents', function(){
        assert(typeof twee.__config['__folders__'], 'object');
        assert(typeof twee.__config['__folders__']['Default'], 'object');
    });

    it('__setup__ configs presents', function(){
        assert(typeof twee.__config['__setup__'], 'object');
        assert(typeof twee.__config['__setup__']['Default'], 'object');
    });

    it('`default` application module configs presents', function(){
        assert(typeof twee.__config['default'], 'object');
    });
});
