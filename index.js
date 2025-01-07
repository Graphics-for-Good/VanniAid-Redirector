const express = require('express');
const app = express();

var newSite = 'https://ratnathicam.wixsite.com/vanni-aid'

app.get('*', (req, res) => {
    var path = req.path;
    if (path.startsWith('/')) path = path.slice(1)
    if (path.endsWith('/')) path = path.slice(0, -1)
    
    var site = `${newSite}/${path}`
    if (site.startsWith('/')) site = site.slice(1)
    if (site.endsWith('/')) site = site.slice(0, -1)

    var query = req.query
    if (query) {
        var queryStr = JSON.stringify(query)
        queryStr = queryStr.slice(1, -1)
        if (queryStr.length > 0) {

            if (queryStr.includes(',')) queryStr = queryStr.split(',')
            else queryStr = [queryStr]
            queryStr.forEach((q, i) => {
                if (q.startsWith(' ')) q = q.slice(1)
                if (q.endsWith(' ')) q = q.slice(0, -1)

                if (q.includes(':')) {
                    q = q.split(':')
                    q.forEach((qua, i2) => {
                        if (qua.startsWith('"')) qua = qua.slice(1)
                        if (qua.endsWith('"')) qua = qua.slice(0, -1)
                        q[i2] = qua
                    })

                    queryStr[i] = q
                }
                else queryStr[i] = ''
            })

            query = ''
            var isFirst = true
            queryStr.forEach(q => {
                if (Array.isArray(q)) {
                    if (q[0] == '') return
                    if (q[1] == '') return

                    if (isFirst) {
                        query += '?'
                        isFirst = false
                    }
                    else query += '&'
                    query += `${q[0]}=${q[1]}`
                }
            })
        }
        else query = ''
    }
    
    res.redirect(`${site}${query}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});