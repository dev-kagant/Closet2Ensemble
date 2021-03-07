import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Modal } from "./../Modal/Modal";
import { restoreUser } from '../../store/user'
import { setCategory, setColors, setSubCategories, setWeather, setStyles, setSizes, setCategories } from '../../store/category'

import $ from 'jquery';
import "./Closet.css";

import ImageMap from "image-map";
import theCloset from '../../images/okthistime.jpg';
import theDoor from '../../images/theGreenestDoor.jpg';
import CategoryDisplay from '../Items/CategoryDisplay/CategoryDisplay';
import NewItems from '../Items/NewItemModal/NewItem';



const MyCloset = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    const closetOwnerItems = useSelector(state => state.user.closetOwner.items);
    const closetOwner = useSelector(state => state.user.closetOwner.id)

    const [categoryItems, setCategoryItems] = useState([])
    const [subCates, setSubCates] = useState([])

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showNewItemModal, setShowNewItemModal] = useState(false);

    useEffect(() => {
        if (!closetOwnerItems || !closetOwner) {
            return
        }
        ImageMap('img[usemap]', 0)
        hoverEffect()
    }, [])


    const handleCategory = async (e) => {
        await dispatch(setCategory(e.target.alt))
            .then((subCate) => {
                const newCategoryItems = []
                const newSubCates = new Set()
                for (let i = 0; i < closetOwnerItems.length; i++) {
                    for (let j = 0; j < subCate.length; j++) {
                        if (closetOwnerItems[i].subCategoryId === subCate[j].id) {
                            newCategoryItems.push(closetOwnerItems[i])
                            newSubCates.add(subCate[j])
                        }
                    }
                }
                setCategoryItems(newCategoryItems)
                setSubCates([...newSubCates])
            })
        setShowCategoryModal(true)
    }


    const handleNewItems = async () => {
        await dispatch(setSubCategories())
        await dispatch(setColors())
        await dispatch(setStyles())
        await dispatch(setWeather())
        await dispatch(setSizes())
        await dispatch(setCategories())
        return setShowNewItemModal(true)
    }


    const handleDoneAdding = async () => {
        setShowNewItemModal(false);
        let res = await dispatch(restoreUser())
        if (res) {
            history.push(`/closet/${res}`)
        }
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
                    <CategoryDisplay categoryItems={categoryItems} subCates={subCates} />
                </Modal>
            )}
            {showNewItemModal && (
                <Modal onClose={handleDoneAdding}>
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
        </div>
    )
}

export default MyCloset;
