/* import { getItems } from "../servicios.js/getitems";


export async function getPathsFromIds() {

    const data = await getItems();
    const ids = data.map(item =>{
        console.log(id)
    return{
        params: {
            id: item.id,
        },
    }
        
});

return ids;

}

export async function getItemData(id) {

    const data = await getItems();
    
    
    const product = data.find((item) => item.id.toString() === id);
    
    return{
        id,
        data: product,
    }
        
};
 */

