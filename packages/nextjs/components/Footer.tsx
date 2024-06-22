import ShaboyPlusModal from "./ShaboyPlusModal";

function Footer(){
    return(
        <div className="w-full border-t border-[#ffffff14] border-solid p-[20px] flex justify-center">
            <ShaboyPlusModal />
            <div className="text-xs text-[#acacac]">©2024 Shaboy.</div>
        </div>
    );
}

export default Footer;