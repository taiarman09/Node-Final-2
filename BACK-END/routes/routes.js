import express, { Router } from 'express'
import { UserLogin, UserRegister } from '../controllers/UserControler.js'
import { Create, Delete, Get, SingleGet, Update } from '../controllers/TaskControler.js'
import { middleWare } from '../middleware/UserMiddleWare.js'

const routes = Router()

// user authentication
routes.post("/register", UserRegister)
routes.post("/login", UserLogin)

// user crud
routes.post("/Create", middleWare, Create)
routes.get("/Get", middleWare, Get)
routes.get("/Get/:id", middleWare, SingleGet)
routes.put("/Update/:id", middleWare, Update)
routes.delete("/Delete/:id", middleWare, Delete)

export default routes