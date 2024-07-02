"use strict";const e=require("../utils/request.js");exports.ciliSearch=async function(t){return e.request({url:"/cili/search/v1",method:"get",data:t})};
