import {Post} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';

export class AddUserAction extends Action{

    @Post('/addUser')
    public Post(){
        let userName = this.req.body.userName;
        let password = this.req.body.password;

        if (userName !== "1"){
            this.sendAnswer(
                            {
                                token : new VPUtils().generateGUID().toUpperCase(),
                                userName : userName,
                                password : password
                            }
                           );
            return;
        }
        new KernelUtils().createExceptionApiError('1001', 'Usuário já existe');
    }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}