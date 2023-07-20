package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	var db *sql.DB
	db = mysql_connect("root","7fwD79bY8MZf78QM","127.0.0.1","3306","loongson")
	err := db.Ping() 
	if err == nil {
		fmt.Printf("connecte to Mysql database success!\n")
	}
	
	r := gin.Default()
	r.GET("/register", func(c *gin.Context) {
		var user_message Users
		user_message.Username = c.Query("name")
		user_message.Userpassword = c.Query("password")
		mysql_user_register(db,user_message)
		c.String(200, "success")
	})
	
	r.GET("/login", func(c *gin.Context) {
		name := c.Query("name")
		password := c.Query("password")
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if password == user_message.Userpassword {
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/devices", func(c *gin.Context) {
		name := c.Query("name")
		token := c.Query("token")
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			device_list := mysql_device_query(db,strconv.Itoa(user_message.UserId))
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"device" : device_list,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/devices/increase", func(c *gin.Context) {
		name := c.Query("name")
		token := c.Query("token")
		device_id := c.Query("device_id")
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			mysql_device_insert(db,device_id,strconv.Itoa(user_message.UserId))
			device_list := mysql_device_query(db,strconv.Itoa(user_message.UserId))
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"device" : device_list,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/devices/delete", func(c *gin.Context) {
		name := c.Query("name")
		token := c.Query("token")
		device_id := c.Query("device_id")
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			
			mysql_device_delete(db,device_id,strconv.Itoa(user_message.UserId))
			device_list := mysql_device_query(db,strconv.Itoa(user_message.UserId))
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"device" : device_list,
			})
		} else {
			c.String(200, "error")
		}
	})

	r.GET("/nodes", func(c *gin.Context) {
		name := c.Query("name")
		device := c.Query("device")
		token := c.Query("token")
		fmt.Println(device)
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			node_list := mysql_node_query(db,device)
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"node" : node_list,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/data", func(c *gin.Context) {
		name := c.Query("name")
		device := c.Query("device")
		node := c.Query("node")
		token := c.Query("token")
		row := c.DefaultQuery("row", "1")
		fmt.Println(node)
		fmt.Println(device)
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			data := mysql_data_query(db,node,row)
			fmt.Println(data)
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"node" : data,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/messages", func(c *gin.Context) {
		name := c.Query("name")
		device := c.Query("device")
		node := c.Query("node")
		token := c.Query("token")
		row := c.DefaultQuery("row", "1")
		fmt.Println(node)
		fmt.Println(device)
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			content := mysql_message_query(db,device,node,row)
			fmt.Println(content)
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"node" : content,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/instruct", func(c *gin.Context) {
		name := c.Query("name")
		device := c.Query("device")
		node := c.Query("node")
		instruct := c.Query("instruct")
		token := c.Query("token")
		fmt.Println(node)
		fmt.Println(device)
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			mysql_instruct_insert(db,device,node,instruct)
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"node": node,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.GET("/instruct/select", func(c *gin.Context) {
		name := c.Query("name")
		token := c.Query("token")
		device := c.Query("device")
		node := c.Query("node")
		var user_message Users
		trimStr := strings.Trim(name, "'")
		trimStrNotspace := strings.Trim(trimStr, " ")
		user_message = mysql_user_query(db,trimStrNotspace)
	
		if token == user_message.Usertoken {
			instruct := mysql_instruct_query(db,device,node)
			time := time.Now().UnixNano()
			token := name+ strconv.FormatInt(time,10)+"vtioc;i2392k32(Fawf2%WFk2a2r,qw2/*qrqqw"
			strMD5 := MD5(token)
			fmt.Println(strMD5)
			mysql_user_token(db,name,strMD5)

			c.JSON(http.StatusOK, gin.H{
				"name" : name,
				"token": strMD5,
				"node": node,
				"instruct" : instruct,
			})
		} else {
			c.String(200, "error")
		}
	})
	r.Run(":8080")
}
