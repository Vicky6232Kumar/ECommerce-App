import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearError, updatePassword } from '../../actions/userAction'
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import Spinner from '../layouts/Loading'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid'


const UpdatePassword = ({ showAlert }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUpdated, loading, error } = useSelector((state) => state.profile)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [seePassword, setSeePassword] = useState("password")

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword)
    myForm.set("confirmPassword", confirmPassword)

    dispatch(updatePassword(myForm))
  }

  useEffect(() => {

    if (error) {
      showAlert(error)
      dispatch(clearError())
    }

    if (isUpdated) {
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET
      })
      showAlert("Password Updated")
    }
  }, [dispatch, isUpdated, navigate, showAlert, error])


  const viewPassword = () => {
    if (seePassword === "password") {
      setSeePassword("text")
    }
    else {
      setSeePassword("password")
    }

  }


  return (

    <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {loading ? <Spinner /> : <div className="w-full max-w-sm space-y-8">
        <div className="text-center text-2xl ">Update Password</div>

        <form
          className="mt-8 "
          action="#"
          method="POST"
          encType="multipart/form-data"
          onSubmit={updatePasswordSubmit}
        >
          <div>

            <div>
              <label htmlFor="oldPassword" className="font-semibold">
                Old Password
              </label>
              <input
                id="password"
                name="oldPassword"
                type={seePassword}
                autoComplete="current-password"
                required
                className="block w-full mt-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {seePassword === "password" ? <EyeSlashIcon className="relative -top-[1.85rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} /> :
                <EyeIcon className="relative -top-[1.85rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} />
              }
            </div>


            <div>
              <label htmlFor="newPassword" className="font-semibold">
                New Password
              </label>
              <input
                id="password"
                name="newPassword"
                type={seePassword}
                autoComplete="current-password"
                required
                className="block w-full mt-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {seePassword === "password" ? <EyeSlashIcon className="relative -top-[1.85rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} /> :
                <EyeIcon className="relative -top-[1.85rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} />
              }
            </div>

            <div>
              <label htmlFor="confirmPassword" className="font-semibold">
                Confirm New Password
              </label>
              <input
                id="cpassword"
                name="confirmPassword"
                type={seePassword}
                autoComplete="current-password"
                required
                className="block w-full mt-2 rounded-md p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {seePassword === "password" ? <EyeSlashIcon className="relative -top-[1.85rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} /> :
                <EyeIcon className="relative -top-[1.85rem] left-[21rem] h-5 w-5 cursor-pointer text-gray-400 group-hover:text-gray-500" aria-hidden="true" onClick={viewPassword} />
              }
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group  flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in to account
            </button>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default UpdatePassword