import { Card, Text } from "@tremor/react";
import React, { useState, useEffect, useRef } from 'react'
import styles from "./css/QuoteCard.module.css";
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


// type Quote = {
//   id: number;
//   artist: string;
//   artistPicture: string;
//   quote: string;
//   song: string;
//   annotations: string;
//   viewCount: number;
//   annotationContributor: string;
//   annotationUpvotes: number;
// };

// type QCardProps = {
//   quote: Quote;
// };

const QCard: React.FC<QCardProps> = ({ quote }) => {
  console.log("QCardProps", quote)

  const [isVisible, setIsVisible] = useState(false);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false); // State for the comment section
  const [comment, setComment] = useState(''); // State for comment input
  const [comments, setComments] = useState<{ text: string, liked: boolean }[]>([])

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


  return(
    <div
      key={quote.id}
      className="relative border-b-2 border-blue-500 py-3 rounded-lg"
    >
      <div className="relative" onClick={handleToggle}>
        <div className="group relative p-4 border rounded-3xl cursor-pointer transition duration-150 hover:bg-gradient-to-r from-gray-200 to-gray-400">
          <div className="flex items-center space-x-2 group-hover:text-gray-900">
            <span className="block w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src={quote.annotation.annotated_quote_image} 
                alt="" 
                className="w-full h-full object-cover" 
              />
            </span>
            <h2 className="font-bold">{JSON.stringify(quote.annotation.annotated_quote_artist)}</h2>
          </div>
          
          <p className="text-xl text-black group-hover:text-gray-900 transition duration-150 p-2 rounded-lg font-bold">
            {JSON.stringify(quote.annotation.annotated_quote)}
          </p>
          
          <h5 className="absolute bottom-2 right-2 text-sm text-gray-600 group-hover:text-gray-900 font-bold">
            - {JSON.stringify(quote.annotation.annotated_quote_song)}
          </h5>
        </div>
      </div>
      
      {isVisible && (
        <div className="mt-2 p-5 border-4 border-yellow-500 bg-gray-50 rounded-3xl w-5/6 ml-14">
          <h2 className="text-gray-600 font-bold">{JSON.stringify(quote.annotation.annotated_quote_contrib)}</h2>
          <span className="block mb-2 mt-3 text-xl text-black-500 font-bold">{JSON.stringify(quote.annotation.annotation)}</span>
          <p className="font-bold mt-4 text-gray-600">{JSON.stringify(quote.annotation.annotated_quote_timestamp)} @{JSON.stringify(quote.annotation.annotator)}</p>
          
          <div className="mt-4 flex space-x-4">
            <button className="flex items-center font-bold space-x-1 text-black-600 hover:text-black-900">
              <EyeIcon className="w-7 h-7" />
              <span className="text-sm">{JSON.stringify(quote.annotation.annotation_view_count)}</span>
            </button>
            <button className="flex items-center font-bold space-x-1 text-yellow-400 hover:text-yellow-900" onClick={toggleCommentSection}>
              <ChatBubbleLeftIcon className="w-7 h-7" />
              <span className="text-sm">{JSON.stringify(quote.annotation.annotated_comments)}</span>
            </button>
            <button className="flex items-center font-bold space-x-1 text-red-600 hover:text-red-900">
              <HeartIcon className="w-7 h-7" />
              <span className="text-sm">{JSON.stringify(quote.annotation.upvotes)}</span>
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
    )
}

export default QCard;