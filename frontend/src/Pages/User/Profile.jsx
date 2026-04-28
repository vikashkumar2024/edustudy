import React, { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserHook } from "@/hooks/User.hook"

const Profile = () => {
  const { data, isLoading } = useGetUserHook()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: null,
  })

  const [preview, setPreview] = useState("")

  // ✅ set user data
  useEffect(() => {
    if (data?.user) {
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        profilePhoto: null,
      })
      setPreview(data.user.profilePhoto || "")
    }
  }, [data])

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // ✅ handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        profilePhoto: file,
      })
      setPreview(URL.createObjectURL(file))
    }
  }

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)

      if (formData.profilePhoto) {
        form.append("profilePhoto", formData.profilePhoto)
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/updateProfile`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )

      alert(res.data.message || "Profile updated")
    } catch (error) {
      console.log(error)
      alert("Error updating profile")
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={preview || "https://via.placeholder.com/100"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile