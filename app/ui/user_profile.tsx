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
      className={`flex flex-col items-center p-4 rounded-lg bg-transparent shadow-lg w-25 border-4 ${color}`}
    >
      {icon}
      <span className={`font-bold ${color} text-2xl`}>{value}</span>
      <p className={`text-sm ${color}`}>{label}</p>
    </div>
  )
}

const UserBioCard: React.FC<UserBioCardProps> = ({ user, updateBio }) => {
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

    <div className="flex flex-col items-center border-4 p-6 rounded-lg bg-purple w-full shadow-lg h-full relative">
      <div>
            {isOpen && (
              <FileUpload handleImageURlReturn={handleImageURlReturn}/>
            )}
        </div>
   
      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-900">
       <img src={imageURL ? `/uploads/${imageURL}?t=${new Date().getTime()}` : '/default-profile.jpg'} alt="Profile Image" />
      </div>
      <CameraIcon
        className="absolute bottom-50 left-full transform -translate-x-[120px] translate-y-20 h-8 w-8 text-gray-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <div className="text-center mt-8">
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
            className="mt-2 px-4 py-1 border border-gray-400 rounded-full text-blue-700 bg-transparent hover:bg-blue-100 transition duration-150"
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
          color="text-blue-500"
          icon={<UserIcon className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          value={user.annotations.length}
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
};


const AnnotationsFeed: React.FC<AnnotationsFeedProps> = ({ annotations }) => {
  return (
    <div className="w-full sm:w-auto flex-1 border-4 border-grey p-6 rounded-lg h-full mt-4 sm:mt-0 sm:ml-4">
      <h3 className="text-lg font-bold text-black mb-4">Recent Annotations Feeds</h3>
      {annotations.length > 0 ? (
        annotations.map((annotation, index) => {
          // State for managing visibility of the extra content
          const [isVisible, setIsVisible] = useState(false);
          const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false); // State for the comment section
          const [comment, setComment] = useState(''); // State for comment input
          const [comments, setComments] = useState<{ text: string, liked: boolean }[]>([]); // State to store the list of comments

          const handleToggle = () => {
            setIsVisible(!isVisible);
          };

          const toggleCommentSection = () => {
            setIsCommentSectionVisible(!isCommentSectionVisible);
          };

          const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setComment(e.target.value);
          };

          const handlePostComment = () => {
            if (comment.trim() !== '') {
              setComments((prevComments) => [...prevComments, { text: comment, liked: false }]);
              setComment('');
            }
          };

          const toggleLikeComment = (commentIndex: number) => {
            setComments((prevComments) =>
              prevComments.map((c, idx) =>
                idx === commentIndex ? { ...c, liked: !c.liked } : c
              )
            );
          };

          return (
            <div
              key={index}
              className="relative border-b-2 border-blue-500 py-3 rounded-lg"
            >
              <div className="relative" onClick={handleToggle}>
                <h1>{JSON.stringify(annotation.id)}</h1>
                <div className="group relative p-4 border rounded-3xl cursor-pointer transition duration-150 hover:bg-gradient-to-r from-gray-200 to-gray-400">
                  <div className="flex items-center space-x-2 group-hover:text-gray-900">
                    <span className="block w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src={annotation.annotated_quote_image} 
                        alt="" 
                        className="w-full h-full object-cover" 
                      />
                    </span>
                    <h2 className="font-bold">{JSON.stringify(annotation.annotated_quote_artist)}</h2>
                  </div>
                  
                  <p className="text-xl text-black group-hover:text-gray-900 transition duration-150 p-2 rounded-lg font-bold">
                    {JSON.stringify(annotation.annotated_quote)}
                  </p>
                  
                  <h5 className="absolute bottom-2 right-2 text-sm text-gray-600 group-hover:text-gray-900 font-bold">
                    - {JSON.stringify(annotation.annotated_quote_song)}
                  </h5>
                </div>
              </div>
              
              {isVisible && (
                <div className="mt-2 p-5 border-4 border-yellow-500 bg-gray-50 rounded-3xl w-5/6 ml-14">
                  <h2 className="text-gray-600 font-bold">{JSON.stringify(annotation.annotated_quote_contrib)}</h2>
                  <span className="block mb-2 mt-3 text-xl text-black-500 font-bold">{JSON.stringify(annotation.annotation)}</span>
                  <p className="font-bold mt-4 text-gray-600">{JSON.stringify(annotation.annotated_quote_timestamp)} @{JSON.stringify(annotation.annotator)}</p>
                  
                  <div className="mt-4 flex space-x-4">
                    <button className="flex items-center font-bold space-x-1 text-black-600 hover:text-black-900">
                      <EyeIcon className="w-7 h-7" />
                      <span className="text-sm">{JSON.stringify(annotation.annotation_view_count)}</span>
                    </button>
                    <button className="flex items-center font-bold space-x-1 text-yellow-400 hover:text-yellow-900" onClick={toggleCommentSection}>
                      <ChatBubbleLeftIcon className="w-7 h-7" />
                      <span className="text-sm">{JSON.stringify(annotation.annotated_comments)}</span>
                    </button>
                    <button className="flex items-center font-bold space-x-1 text-red-600 hover:text-red-900">
                      <HeartIcon className="w-7 h-7" />
                      <span className="text-sm">{JSON.stringify(annotation.upvotes)}</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {isCommentSectionVisible && (
                    <div className="mt-4">
                      {comments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold">Comments:</h4>
                        <ul className="space-y-2">
                          {comments.map((comment, idx) => (
                            <li
                              key={idx}
                              className="flex items-center mt-4 p-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-2xl border border-gray-300"
                            >
                              <span className="block w-8 h-8 bg-pink-500 rounded-full overflow-hidden mr-2">
                                <img 
                                  src="/path-to-user-avatar.jpg" 
                                  alt="User Avatar" 
                                  className="w-full h-full object-cover" 
                                />
                              </span>

                              <div className="flex-1">
                                <div className="text-sm font-semibold">@johndoe</div>
                                <div className="text-gray-700">{comment.text}</div>
                              </div>

                              <button
                                className={`flex items-center ${
                                  comment.liked ? 'text-yellow-600' : 'text-red-700'
                                } transition-colors duration-150`}
                                onClick={() => toggleLikeComment(idx)}
                              >
                                <HeartIcon className="w-5 h-5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                      {/* Comment Input & Post Button */}
                      <textarea
                        className="w-full p-2 border-2 border-yellow-300 rounded-lg"
                        rows={3}
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write your reply..."
                      ></textarea>
                      <button
                        className="mt-2 px-4 py-1 bg-gray-400 text-white rounded-2xl hover:bg-gray-700"
                        onClick={handlePostComment}
                      >
                        Post your reply
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No annotations available.</p>
      )}
    </div>
  );
};


const ProfilePage: React.FC<{userdata: User}> = ({userdata, updateBio}) => {
  // const user = JSON.stringify(userdata)
  const slicedArray = userdata.annotations.slice(0,5)
  console.log(userdata)
  console.log("annotation_iq", userdata.annotation_iq)

  return (

    <div className="grid grid-cols-1 sm:grid-cols-12 mt-12 min-h-screen bg-white">
      <div className="sm:col-span-4">
        <UserBioCard user={userdata} updateBio={updateBio} />
      </div>
      <div className="sm:col-span-8">
        <AnnotationsFeed annotations={slicedArray} />
      </div>
    </div>
  )
}

export default ProfilePage