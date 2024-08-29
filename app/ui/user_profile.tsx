'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  UserIcon,
  PencilSquareIcon,
  GiftIcon,
  StarIcon,
  CameraIcon,
} from '@heroicons/react/24/outline'
import 'react-edit-text/dist/index.css'

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

const user: User = {
  name: 'Marcus James',
  bio: 'Software Engineer at lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  profileImage: '/profile1.jpg',
  followers: 1200,
  annotations: 300,
  contributions: 150,
  quotesIQ: 45,
}

const annotations: string[] = [
  'Annotation 1',
  'Annotation 2',
  'Annotation 3',
  'Annotation 4',
  'Annotation 5',
  'Annotation 6',
  'Annotation 7',
  'Annotation 8',
]

const StatCard: React.FC<StatCardProps> = ({ value, label, color, icon }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg bg-transparent shadow-lg w-25 border-4 ${color}`}
    >
      {icon}
      <span className={`font-bold ${color} text-2xl`}>{value}</span>
      <p className={`text-sm ${color}`}>{label}</p>
    </div>
  )
}

const UserBioCard: React.FC<UserBioCardProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState(user.bio)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto' // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Set it to the scroll height
    }
  }, [bio])

  return (
    <div className="flex flex-col items-center border-4 p-6 rounded-lg bg-purple w-full sm:w-80 shadow-lg h-full relative">
      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-900">
        <img
          src={user.profileImage}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <CameraIcon
        className="absolute bottom-50 left-full transform -translate-x-[120px] translate-y-20 h-8 w-8 text-gray-600 cursor-pointer"
        onClick={() => alert('Upload new profile picture')}
      />

      <div className="text-center mt-8">
        <h2 className="text-xl font-bold text-black">{user.name}</h2>
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
                rows={1} // Start with 1 row, will expand automatically
              />
              <div className="text-right text-sm text-gray-600">
                {bio.length}/256
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap w-full">{bio}</p>
          )}
          <button
            className="mt-2 px-4 py-1 border border-gray-400 rounded-full text-blue-700 bg-transparent hover:bg-blue-100 transition duration-150"
            onClick={toggleEditing}
          >
            {isEditing ? 'Save Bio' : 'Edit Bio'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatCard
          value={user.followers}
          label="Followers"
          color="text-blue-500"
          icon={<UserIcon className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          value={user.annotations}
          label="Annotations"
          color="text-green-500"
          icon={<PencilSquareIcon className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          value={user.contributions}
          label="Contributions"
          color="text-red-500"
          icon={<GiftIcon className="h-6 w-6 text-red-500" />}
        />
        <StatCard
          value={user.quotesIQ}
          label="QuotesIQ"
          color="text-purple-500"
          icon={<StarIcon className="h-6 w-6 text-purple-500" />}
        />
      </div>
    </div>
  )
}

const AnnotationsFeed: React.FC<AnnotationsFeedProps> = ({ annotations }) => {
  return (
    <div className="w-full sm:w-auto flex-1 border-4 border-black-500 p-6 rounded-lg h-full mt-4 sm:mt-0 sm:ml-4">
      <h3 className="text-lg font-bold text-black mb-4">Recent Annotations Feeds</h3>
      {annotations.map((annotation, index) => (
        <div
          key={index}
          className="border-b-2 border-blue-500 py-3 hover:bg-gray-200 transition duration-150 rounded-lg"
        >
          <p className="text-black">{annotation}</p>
        </div>
      ))}
    </div>
  )
}

const ProfilePage: React.FC = ({userdata}) => {
  console.log("userdata", userdata)

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center mt-12 min-h-screen p-4 bg-white">
      <UserBioCard user={userdata} />
      <AnnotationsFeed annotations={userdata.annotations} />
    </div>
  )
}

export default ProfilePage