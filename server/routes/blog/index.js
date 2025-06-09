let express = require("express"),
    router = express.Router();
const Request = require("request");

router.get("/all-post", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + `/posts?_embed&per_page=${req.query.perPage}&page=${req.query.currentPage}` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.post("/search", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + `/search?search=${req.body.query_string}&_embed&per_page=${req.body.perPage}&page=${req.body.currentPage}` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.get("/single-post/:id", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";

  Request.get({ url: encodeURI(url + `/posts?_embed&slug=${req.params.id}`) }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body[0] });
    }
  });
});

router.get("/single-category/:id", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";

  Request.get({ url: url + `/posts?_embed&categories=${req.params.id}&per_page=${req.query.perPage}&page=${req.query.currentPage}` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.get("/all-categories", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + `/categories?_fields=count,name,slug,description,link,id` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.get("/widget-categories", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + `/categories?_fields=count,name,slug,description,link,id&per_page=${req.query.perPage}` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.get("/widget-tags", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + `/tags?_fields=count,name,slug,description,link,id&per_page=${Number(req.query.perPage)}` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.get("/latest-post", (req, res) => {
  let url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + `/posts?_embed&per_page=${req.query.perPage}` }, async (error, response, body) => {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (err) {
        return res.send({ error: error, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

module.exports = router;
