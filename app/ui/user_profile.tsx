'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  UserIcon,
  PencilSquareIcon,
  GiftIcon,
  StarIcon,
  CameraIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import 'react-edit-text/dist/index.css'
import FileUpload from '../ui/uploadImageModal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";
import InfiniteScrollCmp from './InfiniteScrollWithHeight';


type User = {
  name: string
  bio: string
  profileImage: string
  followers: number
  annotations: number
  contributions: number
  quotesIQ: number
}

type UserBioCardProps = {
  user: User
}

type StatCardProps = {
  value: number
  label: string
  color: string
  icon: JSX.Element
}

type AnnotationsFeedProps = {
  annotations: string[]
}



// const user: User = {
//   name: 'Marcus James',
//   bio: 'Software Engineer at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//   profileImage: '/profile1.jpg',
//   followers: 1200,
//   annotations: 300,
//   contributions: 150,
//   quotesIQ: 45,
// }

//const annotations: string[] = [
// 'Annotation 1',
//   'Annotation 2',
//   'Annotation 3',
//   'Annotation 4',
//   'Annotation 5',
//   'Annotation 6',
//   'Annotation 7',
//   'Annotation 8',
// ]

const StatCard: React.FC<StatCardProps> = ({ value, label, color, icon }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg bg-gradient-to-r from-gray-500 to-gray-400 shadow-lg w-25 ${color} hover:from-gray-600 hover:to-gray-500`}
    >
      {icon}
      <span className={`font-bold ${color} text-2xl`}>{value}</span>
      <p className={`text-sm ${color}`}>{label}</p>
    </div>
  )
}

const UserBioCard: React.FC<UserBioCardProps> = ({ userdata, updateBio }) => {
  const user = userdata.user
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "UserBio Placeholder...");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageURL, setImageURL] = useState(user.profile_image);
  const router = useRouter()

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleBioUpdate = async () => {
    await updateBio(bio, "bio")
    toggleEditing()
  }

  const handleImageURlReturn = (imageUrl) => {
    setImageURL(imageUrl)
    setIsOpen(false)
  }


  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  useEffect(() => {
    setBio(user.bio || "UserBio Placeholder...");
  }, [user.bio]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set it to the scroll height
    }
  }, [bio]);

  return(

    <div className="flex flex-col ml-0 mt-3 items-center border p-6 sm:p-6 sm:rounded-2xl bg-gradient-to-r from-gray-300 to-gray-100 w-full shadow-lg relative sm:pl-6 pl-0 pr-4 sm:pr-6">
  <div>
    {isOpen && (
      <FileUpload handleImageURlReturn={handleImageURlReturn} />
    )}
  </div>

  <div className="relative">
    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-900">
      <img
        src={imageURL ? `/uploads/${imageURL}?t=${new Date().getTime()}` : '/default-profile.jpg'}
        alt="Profile Image"
        className="w-full h-full object-cover"
      />
    </div>
    <CameraIcon
      className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 h-8 w-8 text-blue-900 cursor-pointer"
      onClick={() => setIsOpen(true)}
    />
  </div>

  <div className="text-center mt-8 w-full">
    <h2 className="text-xl font-bold text-black">{user.email || "Unknown User"}</h2>
    <div className="flex flex-col items-center justify-center mt-2 w-full">
      {isEditing ? (
        <div className="w-full">
          <textarea
            ref={textareaRef}
            value={bio}
            onChange={handleBioChange}
            className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-auto"
            maxLength={256}
            placeholder="Edit your bio..."
            rows={1}
          />
          <div className="text-right text-sm text-gray-600">
            {bio.length}/256
          </div>
        </div>
      ) : (
        <p className="whitespace-pre-wrap w-full">{bio}</p>
      )}
      <button
        className="mt-2 px-4 py-1 border rounded-full text-white bg-gradient-to-r from-gray-500 to-gray-300 hover:from-gray-600 hover:to-gray-400 transition duration-150"
        onClick={isEditing ? handleBioUpdate : toggleEditing}
      >
        {isEditing ? "Save Bio" : "Edit Bio"}
      </button>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4 mt-4">
    <StatCard
      value={user.followers}
      label="Followers"
      color="text-yellow-400"
      icon={<UserIcon className="h-8 w-6 text-yellow" />}
    />
    <StatCard
      value={userdata.annotations_count}
      label="Annotations"
      color="text-red-700"
      icon={<PencilSquareIcon className="h-6 w-6 text-red" />}
    />
    <StatCard
      value={user.contributions}
      label="Contributions"
      color="text-purple-800"
      icon={<GiftIcon className="h-6 w-6 text-purple" />}
    />
    <StatCard
      value={user.quotesIQ}
      label="QuotesIQ"
      color="text-orange-500"
      icon={<StarIcon className="h-6 w-6 text-orange" />}
    />
  </div>
</div>


    )
};




const ProfilePage: React.FC<{userdata: User}> = ({userdata, updateBio, hasMore, fetchQuotes}) => {
  // const user = JSON.stringify(userdata)
  const annotations = userdata.quotes
  // console.log("annotations",annotations)
  console.log("annotation_id", annotations[0].annotation)
  console.log("annotation_iq", userdata.annotation_iq)
  console.log(annotations.length)

  return (

    <div className="grid grid-cols-1 sm:grid-cols-12 mt-12 min-h-screen bg-white sm:pl-6">
  <div className="sm:col-span-4">
    <UserBioCard userdata={userdata} updateBio={updateBio} />
  </div>
  <div className="sm:col-span-8">
    <InfiniteScrollCmp
      quotes={userdata.quotes}
      fetchQuotes={fetchQuotes}
      hasMore={hasMore}
    />
  </div>
</div>

  )
}

export default ProfilePage