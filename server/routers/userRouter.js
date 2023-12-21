const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const {
  getCurrentUser,
  updatePassword,
  updateCurrentUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
} = require("../controllers/userController");
const { checkAuth, authorizedRoles } = require("../middlewares/auth");

const router = require("express").Router();

// General routes
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// Current user routes
router
  .route("/me")
  .get(checkAuth, getCurrentUser)
  .put(checkAuth, updateCurrentUser);
router.route("/me/uploadAvatar").put(checkAuth, uploadAvatar);
router.route("/me/updatePassword").put(checkAuth, updatePassword);

// Admin routes
router.route("/").get(checkAuth, authorizedRoles("admin"), getAllUsers);
router
  .route("/:id")
  .get(checkAuth, authorizedRoles("admin"), getUser)
  .put(checkAuth, authorizedRoles("admin"), updateUser)
  .delete(checkAuth, authorizedRoles("admin"), deleteUser);

module.exports = router;
