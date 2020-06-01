const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`

    // 返回promise 
    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}';`
    const rows = await  exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData是一个博客对象，包含title，content等属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `insert into blogs (title,content,createTime,author)
                 values ('${title}','${content}',${createTime},'${author}')`
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    } 
}

const updateBlog = async (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const sql = `
        update blogs set title='${title}',content='${content}' where id=${id}
    `
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    } else {
        return false
    }
}

const delBlog = async (id, author) => {
    const sql = `
        delete from blogs where id=${id} and author='${author}'
    `
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    } else {
        return false
    }
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}