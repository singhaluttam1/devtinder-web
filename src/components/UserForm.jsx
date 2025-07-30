const UserForm = ({
  userData,
  onSubmit,
  setUserData,
  errorMessage,
  formName,
  showAuthFields = false,
  onSwitchToLogin,
  isSubmitting = false,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Photo URL validation
    if (!userData.photourl.trim()) {
      alert("Photo URL is required");
      return;
    }
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(userData.photourl)) {
      alert("Please enter a valid Photo URL");
      return;
    }
    onSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 my-10 rounded-box w-xs border p-4 m-auto">
      <legend className="fieldset-legend text-3xl">{formName}</legend>

      <div className="form-control">
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered" 
          name="firstName" 
          value={userData.firstName} 
          onChange={handleChange} 
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered" 
          name="lastName" 
          value={userData.lastName} 
          onChange={handleChange} 
          required
        />
      </div>

      {showAuthFields && (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              name="emailID"
              value={userData.emailID}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
        </>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text">About</span>
        </label>
        <textarea 
          className="textarea textarea-bordered" 
          name="about" 
          value={userData.about} 
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Photo URL</span>
        </label>
        <input 
          type="url" 
          className="input input-bordered" 
          name="photourl" 
          for
          value={userData.photourl} 
          onChange={handleChange} 
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input 
          type="number" 
          className="input input-bordered" 
          name="age" 
          value={userData.age} 
          onChange={handleChange} 
          min="1"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Gender</span>
        </label>
        <select 
          className="select select-bordered" 
          name="gender" 
          value={userData.gender} 
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {errorMessage && (
        <div className="alert alert-error mt-4">
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            formName
          )}
        </button>

        {showAuthFields && onSwitchToLogin && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onSwitchToLogin}
          >
            Already have an account? Login
          </button>
        )}
      </div>
    </form>
  )
}

export default UserForm