import "./Navbar.css";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) setIsScrolled(true);
            else setIsScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="nav-left">

                    {/* LOGO */}
                    <div className="logo">
                        <svg className="logo-svg" viewBox="0 0 300 120">
                            <defs>
                                <path id="logoCurve" d="M 20 80 Q 150 55 280 80" fill="transparent" />
                            </defs>

                            <text className="logo-text" lengthAdjust="spacingAndGlyphs" textLength="220">
                                <textPath href="#logoCurve" startOffset="50%" textAnchor="middle">
                                    NETFLIX
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* PC MENU */}
                    <ul className="menu">
                        <li>홈</li>
                        <li>시리즈</li>
                        <li>영화</li>
                        <li>게임</li>
                        <li>NEW! 요즘 대세 콘텐츠</li>
                        <li>내가 찜한 리스트</li>
                        <li>언어별로 찾아보기</li>
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="nav-right">
                    <FiSearch size={26} />
                    <span>키즈</span>

                    <div className="bell-wrap">
                        <IoNotificationsOutline size={28} />
                    </div>

                    {/* 햄버거 버튼 */}
                    <button
                        className="hamburger"
                        onClick={() => setOpenMenu(true)}
                    >
                        <HiMenu size={28} />
                    </button>
                </div>
            </header>

            {/* ---------- 모바일 메뉴 ---------- */}
            <div className={`side-menu ${openMenu ? "show" : ""}`}>
                <div className="side-header">
                    <h2>메뉴</h2>
                    <HiX
                        className="close-btn"
                        size={30}
                        onClick={() => setOpenMenu(false)}
                    />
                </div>

                <ul>
                    <li>홈</li>
                    <li>시리즈</li>
                    <li>영화</li>
                    <li>게임</li>
                    <li>NEW! 요즘 대세 콘텐츠</li>
                    <li>내가 찜한 리스트</li>
                    <li>언어별로 찾아보기</li>
                </ul>
            </div>

            {/* 오버레이 */}
            {openMenu && <div className="overlay" onClick={() => setOpenMenu(false)} />}
        </>
    );
};

export default Navbar;
