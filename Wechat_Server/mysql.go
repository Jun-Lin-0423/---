package main

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type Users struct {
	UserId   int    `db:"id"`
	Username string `db:"name"`
	Userpassword      string `db:"password"`
	Usertoken      string `db:"token"`
}

func mysql_connect(name string,password string,ip string,port string,database string) *sql.DB {
	var mysql string
	if password != "" {
		mysql = name + ":"+password+"@tcp("+ip+":"+port+")/"+database
	}else {
		mysql = name + "@tcp("+ip+":"+port+")/"+database
	}
	
	db, err := sql.Open("mysql", mysql) 
	if err != nil {
		fmt.Printf("mysql:%s invalid,err:%v\n", mysql, err)
	}
	return db
}

func mysql_instruct_insert(DB *sql.DB, device string,node string,instruct string) {
	res, err := DB.Exec("insert into instruct(device_id,node_id,instruct) values(?,?,?)", device,node,instruct)
	if err != nil {
		return
	}
	res.RowsAffected()
}

func mysql_user_register(DB *sql.DB,user Users) {
	res, err := DB.Exec("insert into user(name,password) values(?,?)", user.Username,user.Userpassword)
	if err != nil {
		return
	}
	res.RowsAffected()
}

func mysql_device_insert(DB *sql.DB, device string,UserId string) {
	res, err := DB.Exec("insert into user_device(device_id, user_id) values('?','?')", device,UserId)
	if err != nil {
		return
	}
	res.RowsAffected()
}

func mysql_device_delete(DB *sql.DB, device string, userId string) {
    query := "DELETE FROM user_device WHERE device_id=? AND user_id=?"
    res, err := DB.Exec(query, device, userId)
    if err != nil {
        return 
    }
    res.RowsAffected()
}


func mysql_user_query(DB *sql.DB,username string) Users{
	var user Users
	rows, err := DB.Query("select * from user where name = '"+username+"'")
	if err != nil {
	fmt.Println(err)
	}
	for rows.Next() {
	rows.Scan(&user.UserId,&user.Username,&user.Userpassword,&user.Usertoken)
	}
	defer rows.Close()
	return user
}

func mysql_device_query(DB *sql.DB,userid string) string {
    stmt, err := DB.Prepare("select device_id,online from user_device where user_id = '"+userid+"'")
    if err != nil {
    }
    defer stmt.Close()
    rows, err := stmt.Query()
    if err != nil {
    }
    defer rows.Close()
    columns, err := rows.Columns()
    if err != nil {
    }
    count := len(columns)
    tableData := make([]map[string]interface{}, 0)
    values := make([]interface{}, count)
    valuePtrs := make([]interface{}, count)
    for rows.Next() {
      for i := 0; i < count; i++ {
          valuePtrs[i] = &values[i]
      }
      rows.Scan(valuePtrs...)
      entry := make(map[string]interface{})
      for i, col := range columns {
          var v interface{}
          val := values[i]
          b, ok := val.([]byte)
          if ok {
              v = string(b)
          } else {
              v = val
          }
          entry[col] = v
      }
      tableData = append(tableData, entry)
    }
    jsonData, err := json.Marshal(tableData)
    if err != nil {

    }
    fmt.Println(string(jsonData))
    return string(jsonData)
}

func mysql_node_query(DB *sql.DB,device_id string) string {
    stmt, err := DB.Prepare("select node_id, node_power, node_online from device_node where device_id = '"+device_id+"'")
    if err != nil {
    }
    defer stmt.Close()
    rows, err := stmt.Query()
    if err != nil {
    }
    defer rows.Close()
    columns, err := rows.Columns()
    if err != nil {
    }
    count := len(columns)
    tableData := make([]map[string]interface{}, 0)
    values := make([]interface{}, count)
    valuePtrs := make([]interface{}, count)
    for rows.Next() {
      for i := 0; i < count; i++ {
          valuePtrs[i] = &values[i]
      }
      rows.Scan(valuePtrs...)
      entry := make(map[string]interface{})
      for i, col := range columns {
          var v interface{}
          val := values[i]
          b, ok := val.([]byte)
          if ok {
              v = string(b)
          } else {
              v = val
          }
          entry[col] = v
      }
      tableData = append(tableData, entry)
    }
    jsonData, err := json.Marshal(tableData)
    if err != nil {

    }
    fmt.Println(string(jsonData))
    return string(jsonData)
}

func mysql_data_query(DB *sql.DB,node_id string,row string) string {
    stmt, err := DB.Prepare("select * from node_message where node_id = '"+node_id+"' order by id desc limit "+row)
	fmt.Println("select * from node_message where node_id = '"+node_id+"order by id desc limit "+row)
    if err != nil {
    }
    defer stmt.Close()
    rows, err := stmt.Query()
    if err != nil {
    }
    defer rows.Close()
    columns, err := rows.Columns()
    if err != nil {
    }
    count := len(columns)
    tableData := make([]map[string]interface{}, 0)
    values := make([]interface{}, count)
    valuePtrs := make([]interface{}, count)
    for rows.Next() {
      for i := 0; i < count; i++ {
          valuePtrs[i] = &values[i]
      }
      rows.Scan(valuePtrs...)
      entry := make(map[string]interface{})
      for i, col := range columns {
          var v interface{}
          val := values[i]
          b, ok := val.([]byte)
          if ok {
              v = string(b)
          } else {
              v = val
          }
          entry[col] = v
      }
      tableData = append(tableData, entry)
    }
    jsonData, err := json.Marshal(tableData)
    if err != nil {

    }
    fmt.Println(string(jsonData))
    return string(jsonData)
}


func mysql_message_query(DB *sql.DB,device_id string,node_id string,row string) string {
    stmt, err := DB.Prepare("select content from information where node_id = '"+node_id+"' order by id desc limit "+row)
    if err != nil {
    }
    defer stmt.Close()
    rows, err := stmt.Query()
    if err != nil {
    }
    defer rows.Close()
    columns, err := rows.Columns()
    if err != nil {
    }
    count := len(columns)
    tableData := make([]map[string]interface{}, 0)
    values := make([]interface{}, count)
    valuePtrs := make([]interface{}, count)
    for rows.Next() {
      for i := 0; i < count; i++ {
          valuePtrs[i] = &values[i]
      }
      rows.Scan(valuePtrs...)
      entry := make(map[string]interface{})
      for i, col := range columns {
          var v interface{}
          val := values[i]
          b, ok := val.([]byte)
          if ok {
              v = string(b)
          } else {
              v = val
          }
          entry[col] = v
      }
      tableData = append(tableData, entry)
    }
    jsonData, err := json.Marshal(tableData)
    if err != nil {

    }
    fmt.Println(string(jsonData))
    return string(jsonData)
}

func mysql_user_token(DB *sql.DB,username string,token string) {
	sql := "update user set token = ? where name = ?"
	ret, err := DB.Exec(sql, token, username)
	if err != nil {
		fmt.Printf("error:%v\n", err)
		return
	}
	ret.RowsAffected()
}


func mysql_instruct_query(DB *sql.DB,device_id string,node_id string) string {
    fmt.Println("select instruct from instruct where node_id = 'b3a6e34f56cd6212' and device_id = '71bb9d3c5e3156528c9c0d0aa6f2bcfd'")
    stmt, err := DB.Prepare("select instruct from instruct where node_id = '"+node_id+"' and device_id = '"+device_id+"' order by id desc limit 1")
    
    if err != nil {
    }
    defer stmt.Close()
    rows, err := stmt.Query()
    if err != nil {
    }
    defer rows.Close()
    columns, err := rows.Columns()
    if err != nil {
    }
    count := len(columns)
    tableData := make([]map[string]interface{}, 0)
    values := make([]interface{}, count)
    valuePtrs := make([]interface{}, count)
    for rows.Next() {
      for i := 0; i < count; i++ {
          valuePtrs[i] = &values[i]
      }
      rows.Scan(valuePtrs...)
      entry := make(map[string]interface{})
      for i, col := range columns {
          var v interface{}
          val := values[i]
          b, ok := val.([]byte)
          if ok {
              v = string(b)
          } else {
              v = val
          }
          entry[col] = v
      }
      tableData = append(tableData, entry)
    }
    jsonData, err := json.Marshal(tableData)
    if err != nil {

    }
    fmt.Println(string(jsonData))
    return string(jsonData)
}