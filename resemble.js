import { Resemble } from '@resemble/node'

Resemble.setApiKey('YOUR_API_KEY')
      
let page = 1
let pageSize = 10
  
const response = await Resemble.v2.projects.all(page, pageSize)
const projects = response.items