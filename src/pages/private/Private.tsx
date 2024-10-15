import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from '../../core/models/routes';
import { Roles } from '../../core/models/roles';
import { RoleGuard } from '../../core/guards';
import { RoutesWithNotFound } from '../../core/utils';
import { SidebarBattle } from '../../core/components';

const SelectPokemon = lazy(() => import('./SelectPokemon/SelectPokemon'));
const DetailPokemon = lazy(() => import('./DetailPokemon/DetailPokemon'));

const Private = () => {



    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="grid grid-cols-5 overflow-hidden relative">

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="col-span-5 md:col-span-3 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden -order-3">

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-4 2xl:p-8">
                            <RoutesWithNotFound>
                                <Route path="/" element={<Navigate to={PrivateRoutes.LISTPOKEMON} />} />
                                <Route path={PrivateRoutes.LISTPOKEMON} element={<SelectPokemon />} />
                                <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                                    <Route path={PrivateRoutes.DETAILPOKEMON} element={<DetailPokemon />} />
                                </Route>
                            </RoutesWithNotFound>
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}

                {/* <!-- ===== Sidebar Start ===== --> */}
                <div className='col-span-5 md:col-span-2 -order-[4] md:order-4'>
                    <SidebarBattle />
                </div>
                {/* <!-- ===== Sidebar End ===== --> */}
                
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
}
export default Private;