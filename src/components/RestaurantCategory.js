import ItemList from "./ItemList";

const RestaurantCategory = ({ data,showItems,settingShowIndex }) => {
    // const [showItems, setShowItems] = useState(false);

    const toggleAccordion = () => {
        settingShowIndex();
    };

    return (
        <div className="accordion-card">
            {/* Accordion Header */}
            <div className="accordion-header" onClick={toggleAccordion}>
                <span>{data.title} ({data.itemCards.length})</span>
                <span>{showItems ? "▼" : "➤"}</span> 
            </div>

            {/* Accordion Body */}
            {showItems && (
                <div className="accordion-body">
                    <ItemList items={data.itemCards} />
                </div>
            )}
        </div>
    );
};

export default RestaurantCategory;
