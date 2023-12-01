import '@/assets/css/App.css'
import { Button } from "@/components/ui/button"
import { getTickets } from '@/utils/getTickets'


function App() {
    console.log(getTickets())
    return (
        <>
            <Button>Button</Button>
        </>
    )
}

export default App
