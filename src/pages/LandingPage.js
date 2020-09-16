import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../store/actions/postAction'
import PostList from '../components/post/PostList'

function LandingPage(props) {

    useEffect(() => {
        props.fetchPosts()
    }, [])
    return (
        <div>
        {props.posts.map((post) => (
            <PostList post={post} key={post.id}/>
        ))}
        </div>
    )
}

const mapstateToProps = (state) => {
    return {
        posts: state.post.items,
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => {dispatch(fetchPosts())}
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(LandingPage)
