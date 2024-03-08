const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
let issue;
chai.use(chaiHttp);

suite('Functional Tests', function() {
      //   "issue_title": "Fix error in posting data",
    //   "issue_text": "When we post data it has an error.",
    //   
    //   "created_by": "Joe",
    //   "assigned_to": "Joe",
    //   
    //   "status_text": "In QA"
    test('test1',(done)=>{
        chai
        .request(server)
        .post('/api/issues/test')
        .set('content-type','application/json')
        .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
        "assigned_to": "Joe",
        "status_text": "In QA"
        })  
        .end((err,res)=>{
            assert.equal(res.status,200);
            issue=res.body;
            assert.equal(issue.issue_title,'Fix error in posting data');
            assert.equal(issue.issue_text,'When we post data it has an error.');
            assert.equal(issue.created_by,"Joe");
            assert.equal(issue.assigned_to,"Joe");
            assert.equal(issue.status_text,"In QA");   
            done();      
        })
        .timeout(5000);
    })
    test('test2',(done)=>{
        chai
        .request(server)
        .post('/api/issues/test')
        .set('content-type','application/json')
        .send({
        "issue_title": "Fix error in posting data",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
        "assigned_to": "",
        "status_text": ""
        })  
        .end((err,res)=>{
            assert.equal(res.status,200);
            issue=res.body;
            assert.equal(issue.issue_title,'Fix error in posting data');
            assert.equal(issue.issue_text,'When we post data it has an error.');
            assert.equal(issue.created_by,"Joe");
            assert.equal(issue.assigned_to,"");
            assert.equal(issue.status_text,"");    
            done();     
        })
        .timeout(5000);
    })
    test('test3',(done)=>{
        chai
        .request(server)
        .post('/api/issues/test')
        .set('content-type','application/json')
        .send({
        "issue_title": "",
        "issue_text": "When we post data it has an error.",
        "created_by": "Joe",
        "assigned_to": "",
        "status_text": ""
        })  
        .end((err,res)=>{
            assert.equal(res.status,200);
            
            assert.equal(res.body.error,'required field(s) missing');
            done();
                 
        })
        .timeout(5000);
    })
    test('test4',(done)=>{
        chai
        .request(server)
        .get('/api/issues/test')
        .end((err,res)=>{
            assert.equal(res.status,200);
            done();
        })
    })
    test('test5',(done)=>{
        chai
        .request(server)
        .get('/api/issues/test')
        .query({_id:issue._id})
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body[0].issue_text,issue.issue_text);
            done();
        })
    })
    test('test6',(done)=>{
        chai
        .request(server)
        .get('/api/issues/test')
        .query({_id:issue._id,issue_text:issue.issue_text})
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body[0].issue_text,issue.issue_text);
            assert.equal(res.body[0].issue_title,issue.issue_title);
            done();
        })
    })
    test('test7',(done)=>{
        chai
        .request(server)
        .put('/api/issues/test')
        .send({
            _id:issue._id,
            issue_text:'123',

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            
            done();
        })
    })
    test('test8',(done)=>{
        chai
        .request(server)
        .put('/api/issues/test')
        .send({
            _id:issue._id,
            issue_text:'123',
            issue_title:'456'

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            
            done();
        })
    })
    test('test9',(done)=>{
        chai
        .request(server)
        .put('/api/issues/test')
        .send({
            
            issue_text:'123',
            issue_title:'456'

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body.error,'missing _id');
            
            done();
        })
    })
    test('test10',(done)=>{
        chai
        .request(server)
        .put('/api/issues/test')
        .send({
            
            _id:issue._id,
            

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body.error,'no update field(s) sent');
            
            done();
        })
    })
    test('test11',(done)=>{
        chai
        .request(server)
        .put('/api/issues/test')
        .send({
            
            _id:"123",issue_text:'123'
            

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body.error,'could not update');
            
            done();
        })
    })
    test('test12',(done)=>{
        chai
        .request(server)
        .delete('/api/issues/test')
        .send({
            
            _id:issue._id
            

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            
            
            done();
        })
    })
    test('test13',(done)=>{
        chai
        .request(server)
        .delete('/api/issues/test')
        .send({
            
            _id:'123'
            

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body.error, 'could not delete')
            
            
            done();
        })
    })
    test('test14',(done)=>{
        chai
        .request(server)
        .delete('/api/issues/test')
        .send({
            
            _id:''
            

        })
        .end((err,res)=>{
            assert.equal(res.status,200);
            assert.equal(res.body.error, 'missing _id')
            
            
            done();
        })
    })
    

  
    

});
