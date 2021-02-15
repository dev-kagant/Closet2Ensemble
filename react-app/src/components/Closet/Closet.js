import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageMap from "image-map";
import { Modal } from "./../Modal/Modal";
import { setCategory } from '../../store/category'
import $ from 'jquery';
import theCloset from '../../images/okthistime.jpg';
import theDoor from '../../images/theGreenestDoor.jpg';
import "./Closet.css";
import CategoryDisplay from '../Items/CategoryDisplay/CategoryDisplay';
import NewItems from '../Items/NewItemModal/NewItem';

const MyCloset = () => {
    const currentUserCloset = useSelector(state => state.user.closetOwner);
    const dispatch = useDispatch();
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showNewItemModal, setShowNewItemModal] = useState(false);


    useEffect(() => {
        ImageMap('img[usemap]', 0)
        hoverEffect()
    }, [])


    const handleCategory = async (e) => {
        await dispatch(setCategory(e.target.alt))
        setShowCategoryModal(true)
    }

    const handleNewItems = async () => {
        setShowNewItemModal(true)
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
            {showCategoryModal && (
                <Modal onClose={() => setShowCategoryModal(false)}>
                    <CategoryDisplay />
                </Modal>
            )}
            {showNewItemModal && (
                <Modal onClose={() => setShowNewItemModal(false)}>
                    <NewItems />
                </Modal>
            )}
            <div className="closet-container">
                <img src={theCloset} usemap="#closet-sections" alt="The Closet" />
                <div className="map-selector"></div>
            </div>
            <map name="closet-sections" id="image-map">
                <area data-title="Jackets" alt="Jackets" shape="rect" coords="260,100,430,320" onClick={handleCategory} />
                <area data-title="Sweaters" alt="Sweaters" shape="rect" coords="440,59,595,236" onClick={handleCategory} />
                <area data-title="Bottoms" alt="Bottoms" shape="rect" coords="260,340,425,540" onClick={handleCategory} />
                <area data-title="Dresses" alt="Dresses" shape="rect" coords="615,340,780,600" onClick={handleCategory} />
                <area data-title="Dresses" alt="Dresses" shape="rect" coords="445,260,507,535" onClick={handleCategory} />
                <area data-title="Accessories" alt="Accessories" shape="rect" coords="340,540,415,600" onClick={handleCategory} />
                <area data-title="Shoes" alt="Shoes" shape="rect" coords="265,555,335,600" onClick={handleCategory} />
                <area data-title="Handbags" alt="Handbags" shape="rect" coords="445,535,600,600" onClick={handleCategory} />
                <area data-title="Jackets" alt="Jackets" shape="rect" coords="535,255,595,530" onClick={handleCategory} />
                <area data-title="Tops" alt="Tops" shape="rect" coords="615,100,780,320" onClick={handleCategory} />
                <area data-title="Accessories" alt="Accessories" shape="rect" coords="130,210,160,230" onClick={handleCategory} />
                <area data-title="Handbags" alt="Handbags" shape="rect" coords="80,80,250,230" onClick={handleCategory} />
                <area data-title="Shoes" alt="Shoes" shape="rect" coords="80,235,250,320" onClick={handleCategory} />
                <area data-title="Shoes" alt="Shoes" shape="rect" coords="900,180,970,235" onClick={handleCategory} />
                <area data-title="Handbags" alt="Handbags" shape="rect" coords="800,60,940,230" onClick={handleCategory} />
                <area data-title="Shoes" alt="Shoes" shape="rect" coords="790,235,970,320" onClick={handleCategory} />
                <area data-title="Pajamas" alt="Pajamas" shape="rect" coords="70,320,250,600" onClick={handleCategory} />
                <area data-title="Undergarments" alt="Undergarments" shape="rect" coords="792,320,975,600" onClick={handleCategory} />
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
            <div className="add-item-icon" onClick={handleNewItems}><i class="fas fa-shopping-bag"></i></div>
            {/* <div className="add-item-icon"><i class="fas fa-plus"></i></div> */}
            {/* <div className="add-item-icon"><i class="fas fa-tags"></i></div> */}
        </div>
    )
}

export default MyCloset;
