import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageMap from "image-map";
import { Modal } from "./../Modal/Modal";
import { setCategory } from '../../store/category'
import $ from 'jquery';
import theCloset from '../../images/okthistime.jpg';
import theDoor from '../../images/theGreenestDoor.jpg';
// import theBags from '../../images/hanger-silhouettes-hangers-clothes-fashion-equipment-isolated-transparent-retail-boutique-wardrobe-house-hang-out-metal-racks-with-hooks-coat-dress-pants-shirt-vector_81894-4216 (2).jpg'
import "./Closet.css";
import CategoryDisplay from '../Items/CategoryDisplay/CategoryDisplay';

const MyCloset = () => {
    const currentUserCloset = useSelector(state => state.user.closetOwner);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        ImageMap('img[usemap]', 0)
        hoverEffect()
    }, [])

    // if (!loaded) {
    //     return null
    // }

    const handleCategory = (e) => {
        console.log(e.target.alt)
        dispatch(setCategory(e.target.alt))
        setShowModal(true)
    }


    // ============ Only necessary if I want an effect on the image map ===================
    const hoverEffect = () => {
        // $('#image-map area').hover(
        //     function () {
        //         var coords = $(this).attr('coords').split(','),
        //             width = $('.closet-container').width(),
        //             height = $('.closet-container').height();
        //         $('.closet-container .map-selector').addClass('hover').css({
        //             'left': coords[0] + 'px',
        //             'top': coords[1] + 'px',
        //             'right': width - coords[2],
        //             'bottom': height - coords[3]
        //         })
        //     },
        //     function () {
        //         $('.closet-container .map-selector').removeClass('hover').attr('style', '');
        //     }
        // )
    }
    // =========================================================================================

    return (

        <div className="big-closet-container">
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CategoryDisplay />
                </Modal>
            )}
            <div className="closet-container">
                <img src={theCloset} usemap="#closet-sections" alt="The Closet" />
                <div className="map-selector"></div>
            </div>
            <map name="closet-sections" id="image-map">
                <area data-title="Jackets" alt="Jackets" shape="rect" coords="260,100,430,320" onClick={handleCategory} />
                <area data-title="Sweaters" alt="Sweaters" shape="rect" coords="440,59,595,236" href="" />
                <area data-title="Bottoms" alt="Bottoms" shape="rect" coords="260,340,425,540" href="" />
                <area data-title="Dresses" alt="Dresses-left" shape="rect" coords="615,340,780,600" href="" />
                <area data-title="Dresses" alt="Dresses-center" shape="rect" coords="445,260,507,535" href="" />
                <area data-title="Accessories" alt="Accessories-basket" shape="rect" coords="340,540,415,600" href="" />
                <area data-title="Shoes" alt="Shoes-bottom" shape="rect" coords="265,555,335,600" href="" />
                <area data-title="Handbags" alt="Handbags-below" shape="rect" coords="445,535,600,600" href="" />
                <area data-title="Jackets" alt="Jackets-center" shape="rect" coords="535,255,595,530" href="" />
                <area data-title="Tops" alt="Tops" shape="rect" coords="615,100,780,320" href="" />
                <area data-title="Accessories" alt="sunglasses" shape="rect" coords="130,210,160,230" href="" />
                <area data-title="Handbags" alt="Handbags-left" shape="rect" coords="80,80,250,230" href="" />
                <area data-title="Shoes" alt="Shoes-left" shape="rect" coords="80,235,250,320" href="" />
                <area data-title="Shoes" alt="Shoes-right" shape="rect" coords="900,180,970,235" href="" />
                <area data-title="Handbags" alt="Handbags-right" shape="rect" coords="800,60,940,230" href="" />
                <area data-title="Shoes" alt="Shoe-single" shape="rect" coords="790,235,970,320" href="" />
                <area data-title="Pajamas" alt="PajamasTees" shape="rect" coords="70,320,250,600" href="" />
                <area data-title="Undergarments" alt="Undergarments" shape="rect" coords="792,320,975,600" href="" />
            </map>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left30" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left20" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left10" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right30" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right20" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right10" />
            </div>
            {/* <div className="add-item-icon"><i class="fas fa-shopping-bag"></i></div> */}
            {/* <div ><img scr={theBags} className="add-item-icon" /></div> */}
            {/* <div ><img scr={theBags} className="add-item-icon" /></div> */}
        </div>
    )
}

export default MyCloset;
