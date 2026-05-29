const { AutoBootManager } = require('./out/autoBootManager');
const path = require('path');
const fs = require('fs');

async function testProjectDetection() {
    const manager = new AutoBootManager();
    
    // Test JavaScript project detection
    console.log('Testing JavaScript project detection...');
    const jsResult = await manager.detectProject('/Users/shaharsolomon/dev/projects/mcp-agents/autoboot');
    console.log('JS Project:', jsResult);
    
    // Create temporary test projects
    const testDir = path.join(__dirname, 'test-projects');
    
    // Test Java Maven project
    const javaMavenDir = path.join(testDir, 'java-maven');
    if (!fs.existsSync(javaMavenDir)) {
        fs.mkdirSync(javaMavenDir, { recursive: true });
        fs.writeFileSync(path.join(javaMavenDir, 'pom.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>`);
    }
    
    console.log('Testing Java Maven project detection...');
    const javaResult = await manager.detectProject(javaMavenDir);
    console.log('Java Project:', javaResult);
    
    // Test Python Django project
    const pythonDir = path.join(testDir, 'python-django');
    if (!fs.existsSync(pythonDir)) {
        fs.mkdirSync(pythonDir, { recursive: true });
        fs.writeFileSync(path.join(pythonDir, 'requirements.txt'), `django>=4.0
psycopg2-binary`);
        fs.writeFileSync(path.join(pythonDir, 'manage.py'), `#!/usr/bin/env python
# Django management script`);
    }
    
    console.log('Testing Python Django project detection...');
    const pythonResult = await manager.detectProject(pythonDir);
    console.log('Python Project:', pythonResult);
    
    // Test Clojure Leiningen project
    const clojureDir = path.join(testDir, 'clojure-lein');
    if (!fs.existsSync(clojureDir)) {
        fs.mkdirSync(clojureDir, { recursive: true });
        fs.writeFileSync(path.join(clojureDir, 'project.clj'), `(defproject myapp "0.1.0-SNAPSHOT"
  :description "A sample Clojure project"
  :dependencies [[org.clojure/clojure "1.11.1"]])`);
    }
    
    console.log('Testing Clojure Leiningen project detection...');
    const clojureResult = await manager.detectProject(clojureDir);
    console.log('Clojure Project:', clojureResult);
    
    // Cleanup
    fs.rmSync(testDir, { recursive: true, force: true });
    
    console.log('');
    console.log('Multi-language project detection test completed!');
}

testProjectDetection().catch(console.error);
