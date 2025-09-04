import { AiOutlineCopyright } from "react-icons/ai";
export default function Footer({ onYearClick }){
    return (
        <footer className="section py-8 text-center opacity-70">
            <p className="font-cute">Napravio tata 👨‍💻 sa puno ❤️ za Minu.</p>
            <p className="font-cute">Sva prava zadržana.</p>
            <p className="flex items-center justify-center gap-1 font-cute">
                <AiOutlineCopyright /> 
                <span style={{ cursor: 'pointer' }} onClick={onYearClick}>2025</span>
            </p>    
        </footer>
    )
}