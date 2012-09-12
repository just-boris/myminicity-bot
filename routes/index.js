/*
 * GET home page.
 */

exports.init = function(app) {
    "use strict";
    var http = require('http'),
        jsdom = require('jsdom'),
        fs     = require('fs'),
        jquery = fs.readFileSync(app.get('project_root') + "/public/js/jquery-1.8.1.min.js").toString(),

        index = function(req, res) {
            res.render('index');
        },

        requestHeaders = {
            'Accept-Encoding': 'utf-8',
            'proxy-connection': 'keep-alive',
            'connection': 'keep-alive',
            'User-Agent': 'curl',
            'Cookie' : "X-MV-Referer=http%3A%2F%2Faltud.myminicity.com%2F;X-Mc-Ref=1;path=/",
            'Host'   : 'altud.myminicity.com',
            'Referer': 'http://altud.myminicity.com/'
        },

        doRequest = function (req, res) {
            var options = {
                    host: '101.44.1.22',
                    port: 80,
                    path: '/',
                    //        method: 'GET',
                    headers: requestHeaders
                },

                httpReq = http.request(options, function(httpRes) {
                    var data = '';
                    httpRes.setEncoding('utf8');
                    console.log(JSON.stringify(httpRes.statusCode));
                    console.log(JSON.stringify(httpRes.headers));
                    httpRes.on('data', function (chunk) {
                        data += chunk;
                    });
                    httpRes.on('end', function() {
                        jsdom.env({
                            html: data,
                            src: [jquery],
                            done : function(errors, window) {
                                var $ = window.$;
                                res.send($('.stats .one.first dd').html());
                            }
                        });
                    });
                });
            httpReq.on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
            //pizdec important string
            httpReq.end();
        };

    app.get('/', index);
    app.get('/doRequest', doRequest);
};

