import React, { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react'

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComments()
  }, [videoId])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`)
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      const data = await response.json()
      setComments(data.items.map(item => ({
        id: item.id,
        text: item.snippet.topLevelComment.snippet.textDisplay,
        user: item.snippet.topLevelComment.snippet.authorDisplayName,
        likes: item.snippet.topLevelComment.snippet.likeCount,
        timestamp: item.snippet.topLevelComment.snippet.publishedAt,
      })))
    } catch (error) {
      console.error('Error fetching comments:', error)
      setError('Failed to load comments. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      // Simulating adding a new comment
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        user: 'Current User',
        likes: 0,
        timestamp: new Date().toISOString(),
      }
      setComments([newCommentObj, ...comments])
      setNewComment('')
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading comments...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          className="w-full p-2 border rounded-md"
          rows="2"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

const Comment = ({ comment }) => {
  return (
    <div className="flex space-x-3">
      <img
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user}`}
        alt={comment.user}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{comment.user}</span>
          <span className="text-gray-500 text-sm">
            {new Date(comment.timestamp).toLocaleDateString()}
          </span>
        </div>
        <p className="mt-1">{comment.text}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <ThumbsUp size={16} />
            <span>{comment.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <ThumbsDown size={16} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">Reply</button>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentSection