angular.module('storefront.account')
    .component('vcAccountCompanyMemberDetail', {
        templateUrl: "account-company-member-detail.tpl",
        require: {
            accountManager: '^vcAccountManager'
        },
        controller: ['$q', '$rootScope', '$scope', '$window', 'accountApi', 'loadingIndicatorService', function ($q, $rootScope, $scope, $window, accountApi, loader) {
            var $ctrl = this;
            $ctrl.loader = loader;
            $ctrl.fieldsConfig = [
                {
                    field: 'CompanyName',
                    disabled: true,
                    visible: false,
                    required: false
                },
                {
                    field: 'Email',
                    disabled: false,
                    visible: true,
                    required: true
                },
                {
                    field: 'UserName',
                    disabled: true,
                    visible: false
                },
                {
                    field: 'Password',
                    disabled: true,
                    visible: false
                },
                {
                    field: 'Roles',
                    disabled: false,
                    visible: true
                }
            ];

            $ctrl.memberComponent = null;

            $scope.init = function (storeId) {
                $ctrl.storeId = storeId;
            };

            function refresh() {
                loader.wrapLoading(function () {
                    return accountApi.getUserById($ctrl.memberNumber).then(function (response) {
                        $ctrl.member = response.data;
                    });
                });
            }

            this.$routerOnActivate = function (next) {
                $ctrl.pageNumber = next.params.pageNumber || 1;
                $ctrl.memberNumber = next.params.member;
                refresh();
            };

            $ctrl.throwAlert = function (level, message, errors) {
                $ctrl.level = level;
                $ctrl.errorMessage = message;
                $ctrl.errors = _.pluck(errors, 'description');
            };

            $ctrl.clearAlert = function () {
                $ctrl.level = null;
                $ctrl.errorMessage = undefined;
                $ctrl.errors = null;
            };

            $ctrl.submitMember = function () {
                if ($ctrl.memberComponent.validate()) {
                    loader.wrapLoading(function () {
                        $ctrl.member.fullName = $ctrl.member.firstName + ' ' + $ctrl.member.lastName;
                        $ctrl.member.emails = [$ctrl.member.email];
                        $ctrl.member.roles = [$ctrl.member.role.id];
                        $ctrl.member.budget = $ctrl.member.budget.toString().replace(',', '.');
                        
                        return accountApi.updateUser($ctrl.member).then(
                            function (response) {
                                refresh();
                                $ctrl.throwAlert('success', 'user updated', undefined);
                                $timeout(function(){
                                    $ctrl.clearAlert();
                                }, 3000);
                            });
                    });
                };
            };
        }]
    });

