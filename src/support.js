import img from './support.png'

export function Support() {
    return (
        <div className="support-me">
            <img src={img} alt="Support Me On Ko-Fi" onClick={
                () => window.open('https://ko-fi.com/samgirshovich', '_blank')
            } />
        </div>
    )
}