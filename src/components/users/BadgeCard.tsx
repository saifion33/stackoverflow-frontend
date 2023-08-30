import bronzeBadge from '../../assets/bronze-badge.svg'
import silverBadge from '../../assets/silver-badge.svg'
import goldBadge from '../../assets/gold-badge.svg'
import { IBadge } from '../../Types'
import { firstBadgeCriteria } from '../../utils/helpers'

interface IProps{
    badge: IBadge,
    isAdmin: boolean
}
const BadgeCard = ({badge,isAdmin}:IProps) => {
    
    const badgeIcon:{[key:string]:string}={
        bronze:bronzeBadge,
        silver:silverBadge,
        gold:goldBadge
    }
    const badgeCircleColer:{[key:string]:string}={
        bronze:'#e2bc9b',
        silver:'#B3B8BC',
        gold:'#FFCC00'
    }
    
    return (
        <div className="border-[1px] rounded p-3 text-gray-600 gap-2 sm:min-w-[244px] sm:max-w-[244px]">
            <div className="flex gap-3 w-full">
                <img src={badgeIcon[badge.name]} alt={badge.name} />
                <div >
                    <p className="text-2xl font-semibold text-gray-900">{badge.count}</p>
                    <p >{badge.name} Badges</p>
                </div>
            </div>
            <div className="pt-5 flex  flex-wrap gap-3">
                {
                    badge.badgesList.length>=1 && badge.badgesList.map(badgeName=><div key={badgeName} className="py-1 px-3 rounded-sm flex items-center gap-1 bg-slate-600 text-stone-50 text-xs"><span className={`inline-block w-2 h-2 rounded-full bg-[${badgeCircleColer[badge.name]}] `}></span> <p>{badgeName}</p></div>)
                }
                {
                    (badge.count<=0 && isAdmin )&& <p className='text-center text-sm'>{firstBadgeCriteria[badge.name]}</p>
                }
            </div>
        </div>
    )
}

export default BadgeCard