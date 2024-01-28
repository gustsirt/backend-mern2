import configObject from "../config/index.js";
import { Router } from "express";
import { ProductClass } from "../dao/index.js";
import { renderPage } from "../helpers/responses.js";

const router = Router();

const productsMongo = new ProductClass();

router.get("/", (req, res) => {
  try {
    renderPage(res, "login", "Login");
  } catch (error) {
    console.error(error);
    renderPage(
      res,
      "error",
      "Error",
      { control: { message: "Ocurrio un error, vuelva a intentarlo" }}
    );
  }
}); //OK

router.get("/register", (req, res) => {
  try {
    renderPage(res, "register", "Nuevo Registro");
  } catch (error) {
    console.error(error);
    renderPage(
      res,
      "error",
      "Error",
      { control: { message: "Ocurrio un error, vuelva a intentarlo" }}
    );
  }
}); //OK

router.get("/products", async (req, res) => {
  try {
    // handle url API products
    const {
      page = 1,
      sort,
      category: initialCategory,
      availability = true,
    } = req.query;
    const category = initialCategory === "all" ? null : initialCategory;
    const apiUrl = new URL(`http://localhost:${configObject.port}/api/products`);
    apiUrl.searchParams.set("page", page);
    apiUrl.searchParams.set("limit", "5");
    if (sort) apiUrl.searchParams.set("sort", sort);
    if (category) apiUrl.searchParams.set("category", category);
    if (availability) apiUrl.searchParams.set("availability", availability);

    const data = await (await fetch(apiUrl)).json();

    if (
      data.error ||
      Number(page) > Number(data.data.totalPages) ||
      Number(page) < 0
    ) {
      return renderPage(res, "products", "Productos", {
        control: { productError: true },
      });
    }

    // update product
    const product = data.data.docs.map((prd) => ({
      ...prd,
      price: prd.price.toLocaleString("es-ES", { style: "decimal" }),
      unavailability: prd.stock === 0,
      link: `/products/${prd._id}`,
    }));

    const filterUrl = (filter) => {
      const params = new URLSearchParams(req.url.split("?")[1] || "");
      params.delete(filter);
      params.delete("page");
      return `/products?${params}`;
    };

    renderPage(res, "products", "Productos", {
      user: {
        userName: req.session?.user?.first_name,
        userRole: req.session?.user?.role,
      },
      control: {
        productError: false,
      },
      arrays: {
        product,
        category: await productsMongo.getCategorys(),
      },
      pageControl: {
        page: data.data.page,
        totalPages: data.data.totalPages,
        hasPrevPage: data.data.hasPrevPage,
        hasNextPage: data.data.hasNextPage,
        prevLink: filterUrl("page") + data.data.prevLink,
        nextLink: filterUrl("page") + data.data.nextLink,
        ascend: filterUrl("sort") + "&sort=asc",
        descend: filterUrl("sort") + "&sort=desc",
        disorderly: filterUrl("sort") + "&sort=disorderly",
        availability: filterUrl("availability") + "&availability=false",
        unavailability: filterUrl("availability") + "&availability=true",
        url: filterUrl("category"),
      },
    });
  } catch (error) {
    console.error(error);
    renderPage(
      res,
      "error",
      "Error",
      {},
      { message: "Ocurrio un error, vuelva a intentarlo" },
    );
  }
}); //OK

router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const apiUrl = `http://localhost:${configObject.port}/api/products/${pid}`;

    const { error, data } = await (await fetch(apiUrl)).json();

    renderPage(
      res,
      "product",
      "Producto",
      {
        user: {
          userName: req.session?.user?.first_name,
          userRole: req.session?.user?.role,
        },
        control: {
          productError: error,
        },
        arrays: {
          product: data,
        },
      },
      { cart: "6591b1a1419b33fbcb57e2b1" },
    );

  } catch (error) {
    console.error(error);
    renderPage(
      res,
      "error",
      "Error",
      {},
      { message: "Ocurrio un error, vuelva a intentarlo" },
    );
  }
});//OK

router.get("/cart", (req, res) => res.render("cart")); // RE HACIENDO

router.get("/realTimeProducts", (req, res) => res.render("realTimeProducts")); // RE HACIENDO

router.get("/chat", (req, res) => res.render("chat")); // RE HACIENDO

export default router;
