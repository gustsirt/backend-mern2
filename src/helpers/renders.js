export const renderPage = (res, page, title, options = {}, others = {}) => {
  const {user = {}, control = {}, arrays = {}, pageControl = {}} = options
  res.render(page, {
    title,
    ...user,
    ...control,
    ...arrays,
    ...pageControl,
    ...others
  })
};

/*
renderPage(res, "products", "Inicio", {
  user: {
    userName: req.session?.user?.first_name,
    userRole: req.session?.user?.role,
  },
  control: {},
  arrays: {},
  pageControl: {},
},{}
);
*/