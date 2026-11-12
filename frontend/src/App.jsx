import './App.css'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {

  return (
   <div>
    <h1>My App</h1>
          <header>
        <Show when="signed-out">
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
   </div>
  )
}

export default App



// import './App.css'
// import { useAuth } from '@clerk/react'

// function App() {
//   const { isLoaded, isSignedIn, userId } = useAuth()

//   return (
//     <div>
//       <h1>My App</h1>

//       <p>Clerk Loaded: {String(isLoaded)}</p>
//       <p>Signed In: {String(isSignedIn)}</p>
//       <p>User ID: {userId || 'No user ID'}</p>
//     </div>
//   )
// }

// export default App