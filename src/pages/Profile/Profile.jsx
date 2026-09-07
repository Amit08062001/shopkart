import { useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  ShieldCheck,
  Pencil,
  Save,
  X,
  LogOut,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logout,
  updateProfile,
} from "../../store/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const orders = useSelector(
    (state) => state.orders.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  if (!user) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setIsEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      return;
    }

    dispatch(
      updateProfile({
        name: trimmedName,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      })
    );

    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <main className="profile-page">

      {/* =========================
          PROFILE HEADER
      ========================= */}

      <section className="profile-header">

        <div>
          <span className="section-eyebrow">
            MY ACCOUNT
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your account information and
            shopping activity.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            className="profile-edit-button"
            onClick={handleEdit}
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        )}

      </section>


      {/* =========================
          PROFILE LAYOUT
      ========================= */}

      <section className="profile-layout">

        {/* =========================
            LEFT - PROFILE INFORMATION
        ========================= */}

        <div className="profile-main-card">

          {/* PROFILE CARD HEADER */}

          <div className="profile-card-header">

            <div className="profile-avatar">
              <User size={32} />
            </div>

            <div>
              <h2>
                {user.name}
              </h2>

              <p>
                {user.email}
              </p>
            </div>

          </div>


          {/* =========================
              EDIT MODE
          ========================= */}

          {isEditing ? (

            <form
              className="profile-form"
              onSubmit={handleSave}
            >

              {/* NAME */}

              <div className="profile-form-field">

                <label htmlFor="profile-name">
                  Full Name
                </label>

                <div className="profile-input-wrapper">

                  <User size={17} />

                  <input
                    id="profile-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="profile-form-field">

                <label htmlFor="profile-email">
                  Email Address
                </label>

                <div className="profile-input-wrapper profile-input-disabled">

                  <Mail size={17} />

                  <input
                    id="profile-email"
                    type="email"
                    value={user.email}
                    disabled
                  />

                </div>

                <small>
                  Email cannot be changed in this demo.
                </small>

              </div>


              {/* PHONE */}

              <div className="profile-form-field">

                <label htmlFor="profile-phone">
                  Phone Number
                </label>

                <div className="profile-input-wrapper">

                  <Phone size={17} />

                  <input
                    id="profile-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />

                </div>

              </div>


              {/* ADDRESS */}

              <div className="profile-form-field">

                <label htmlFor="profile-address">
                  Address
                </label>

                <div className="profile-input-wrapper profile-textarea-wrapper">

                  <MapPin size={17} />

                  <textarea
                    id="profile-address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your delivery address"
                    rows="4"
                  />

                </div>

              </div>


              {/* FORM ACTIONS */}

              <div className="profile-form-actions">

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  <Save size={16} />
                  Save Changes
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  <X size={16} />
                  Cancel
                </button>

              </div>

            </form>

          ) : (

            /* =========================
               VIEW MODE
            ========================= */

            <div className="profile-information">

              {/* NAME */}

              <div className="profile-information-row">

                <div className="profile-information-icon">
                  <User size={17} />
                </div>

                <div>

                  <span>
                    Full Name
                  </span>

                  <strong>
                    {user.name || "Not provided"}
                  </strong>

                </div>

              </div>


              {/* EMAIL */}

              <div className="profile-information-row">

                <div className="profile-information-icon">
                  <Mail size={17} />
                </div>

                <div>

                  <span>
                    Email Address
                  </span>

                  <strong>
                    {user.email || "Not provided"}
                  </strong>

                </div>

              </div>


              {/* PHONE */}

              <div className="profile-information-row">

                <div className="profile-information-icon">
                  <Phone size={17} />
                </div>

                <div>

                  <span>
                    Phone Number
                  </span>

                  <strong>
                    {user.phone || "Not provided"}
                  </strong>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="profile-information-row">

                <div className="profile-information-icon">
                  <MapPin size={17} />
                </div>

                <div>

                  <span>
                    Address
                  </span>

                  <strong>
                    {user.address || "Not provided"}
                  </strong>

                </div>

              </div>

            </div>

          )}

        </div>


        {/* =========================
            RIGHT - SIDEBAR
        ========================= */}

        <aside className="profile-sidebar">

          {/* ACCOUNT STATUS */}

          <div className="profile-side-card">

            <div className="profile-side-icon">
              <ShieldCheck size={21} />
            </div>

            <div>

              <h3>
                Account Status
              </h3>

              <p>
                Your ShopKart account is active.
              </p>

              <span className="profile-active-status">
                Active
              </span>

            </div>

          </div>


          {/* ORDERS */}

          <Link
            to="/orders"
            className="profile-stat-card"
          >

            <div className="profile-stat-icon">
              <Package size={21} />
            </div>

            <div>

              <span>
                My Orders
              </span>

              <strong>
                {orders.length}
              </strong>

            </div>

          </Link>


          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="profile-stat-card"
          >

            <div className="profile-stat-icon">
              <Heart size={21} />
            </div>

            <div>

              <span>
                Wishlist
              </span>

              <strong>
                {wishlistItems.length}
              </strong>

            </div>

          </Link>


          {/* LOGOUT */}

          <button
            type="button"
            className="profile-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </aside>

      </section>

    </main>
  );
}

export default Profile;