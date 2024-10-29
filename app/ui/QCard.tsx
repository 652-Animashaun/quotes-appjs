import { Card, Text } from "@tremor/react";
import React, { useState, useEffect, useRef } from "react";
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
} from "@heroicons/react/24/outline";
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


import { Annotate } from "../actions/annotate";
import { useSession } from "next-auth/react";

const QCard = ({ quote }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [annotation, setAnnotation] = useState(quote.annotation?.annotation || '');
  const [newAnnotation, setNewAnnotation] = useState('');
  const [isContributing, setIsContributing] = useState(false);
  const { data: session, status } = useSession();


  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  console.log("session", session)

  const toggleCommentSection = () => {
    setIsCommentSectionVisible(!isCommentSectionVisible);
  };

  const handleAnnotationChange = (e) => {
    setNewAnnotation(e.target.value);
  };

  const handlePostAnnotation = () => {
    if (newAnnotation.trim() !== '') {
      setAnnotation(newAnnotation);
      setNewAnnotation('');
      const annotationData = {
        annotator: session?.user?.id,
        annotated: quote.id,
        annotation: newAnnotation, 
      };
      setIsContributing(false);
      Annotate(annotationData);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (comment.trim() !== '') {
      setComments((prevComments) => [...prevComments, { text: comment, liked: false }]);
      setComment('');
    }
  };

  const toggleLikeComment = (commentIndex) => {
    setComments((prevComments) =>
      prevComments.map((c, idx) =>
        idx === commentIndex ? { ...c, liked: !c.liked } : c
      )
    );
  };

  return (
    <div
      key={quote.id}
      className="relative border-b-2  border-gray-400 py-3 px-3 rounded-lg w-full md:w-5/6 ml-0 md:ml-12" // Full width on mobile, smaller on larger screens
    >
      <div className="relative" onClick={handleToggle}>
        <div className="group relative p-4 bg-gray-50 rounded-3xl cursor-pointer transition duration-150 hover:bg-gradient-to-r from-gray-200 to-gray-100">
          <div className="flex items-center space-x-2 group-hover:text-gray-900">
            <span className="block w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
              <img src={quote.image} alt="" className="w-full h-full object-cover" />
            </span>
            <h2 className="font-bold text-xs md:text-xs lg:text-sm text-black">{quote.artist}</h2> {/* Adjust font size for smaller screens */}
          </div>

          <p className="text-sm md:text-xl text-black group-hover:text-gray-900 transition duration-150 p-2 rounded-lg font-san">
            {quote.quote}
          </p>

          <h5 className="absolute bottom-2 right-2 text-xs md:text-sm text-black group-hover:text-white font-san">
            - {quote.song}
          </h5>
        </div>
      </div>

      {isVisible && (
        <div className="mt-4 p-5bg-white rounded-3xl w-full md:w-5/6 ml-0 md:ml-14">
          {annotation ? (
            <>
              <h2 className="text-gray-800 font-bold text-sm md:text-lg">
                {quote.annotation?.annotated_quote_contrib} <span className="font-mono text-gray-700 text-xs md:text-sm">@{quote.annotation?.annotator}</span>
              </h2>
              <span className="block mb-2 mt-3 text-xs md:text-sm text-black font-san">
                {annotation}
              </span>
              <p className="font-5 mt-4 text-gray-900 text-xs md:text-sm">
                {quote.annotation?.annotated_quote_timestamp} 
              </p>
            </>
          ) : isContributing ? (
            <div>
              <textarea
                className="w-full p-2 border border-gray-100 rounded-2xl"
                rows={3}
                value={newAnnotation}
                onChange={handleAnnotationChange}
                placeholder="Write your annotation..."
              ></textarea>
              <button
                className="mt-2 px-4 py-1 bg-gray-800 text-white rounded-2xl hover:bg-gray-900"
                onClick={handlePostAnnotation}
              >
                Post Annotation
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-800 mb-2">Want to contribute? Write an annotation to the quote.</p>
              <button
                className="mt-2 px-4 py-1 bg-gray-800 text-white rounded-2xl hover:bg-gray-900"
                onClick={() => setIsContributing(true)}
              >
                Contribute
              </button>
            </>
          )}


          <div className="mt-4 flex space-x-4">
            <button className="flex items-center font-bold space-x-1 text-gray-700 hover:text-black-900">
              <EyeIcon className="w-5 md:w-7 h-5 md:h-7" />
              <span className="text-xs md:text-sm">{quote.annotation?.annotation_view_count}</span>
            </button>
            <button
              className="flex items-center font-bold space-x-1 text-gray-700 hover:text-yellow-900"
              onClick={toggleCommentSection}
            >
              <ChatBubbleLeftIcon className="w-5 md:w-7 h-5 md:h-7" />
              <span className="text-xs md:text-sm">{quote.annotation?.annotated_comments}</span>
            </button>
            <button className="flex items-center font-bold space-x-1 text-gray-700 hover:text-red-900">
              <HeartIcon className="w-5 md:w-7 h-5 md:h-7" />
              <span className="text-xs md:text-sm">{quote.annotation?.upvotes}</span>
            </button>
          </div>

          {isCommentSectionVisible && (
            <div className="mt-4">
              {comments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Comments:</h4>
                  <ul className="space-y-2">
                    {comments.map((comment, idx) => (
                      <li
                        key={idx}
                        className="flex items-center mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-50 rounded-2xl border-gray-300"
                      >
                        <span className="block w-6 md:w-8 h-6 md:h-8 bg-pink-500 rounded-full overflow-hidden mr-2">
                          <img src="/path-to-user-avatar.jpg" alt="User Avatar" className="w-full h-full object-cover" />
                        </span>

                        <div className="flex-1">
                          <div className="text-xs md:text-sm font-semibold">@johndoe</div>
                          <div className="text-xs md:text-sm text-gray-700">{comment.text}</div>
                        </div>

                        <button
                          className={`flex items-center ${comment.liked ? 'text-yellow-600' : 'text-gray-700'} transition-colors duration-150`}
                          onClick={() => toggleLikeComment(idx)}
                        >
                          <HeartIcon className="w-5 h-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <textarea
                className="w-full p-2 border-2 border-gray-300 rounded-2xl"
                rows={3}
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your comment..."
              ></textarea>
              <button
                className="mt-2 px-4 py-1 bg-gray-800 text-white rounded-2xl hover:bg-gray-900"
                onClick={handlePostComment}
              >
                Post your comment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QCard;
