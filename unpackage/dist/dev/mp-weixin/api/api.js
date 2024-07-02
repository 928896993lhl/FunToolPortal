"use strict";
const utils_request = require("../utils/request.js");
async function ciliSearch(params) {
  return utils_request.request({
    url: "/cili/search/v1",
    method: "get",
    data: params
  });
}
exports.ciliSearch = ciliSearch;
